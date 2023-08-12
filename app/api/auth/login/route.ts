import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import SignInEmail from '@/emails/signin';
import WelcomeEmail from '@/emails/welcome';

import { Database } from '@/lib/database.types';
import resend from '@/lib/email';

import messages, { emails } from '@/constants/messages';
import { prisma } from '@/lib/db';
import { getURL } from '@/lib/helpers';

const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
	{ auth: { persistSession: false } }
);

type UserData = {
	email: string;
	id: string;
	new_signup_email: boolean;
};

export async function POST(request: NextRequest) {
	const { email } = await request.json();
	console.log('Class: POST, Function: POST, Line 28 email():', email);
	const user = (await prisma.users.findFirst({
		where: { email },
		select: { email: true, id: true, new_signup_email: true },
	})) as UserData;

	console.log('Class: POST, Function: POST, Line 34 user():', user);

	if (user && user.id) {
		try {
			const { data, error } = await supabaseAdmin.auth.admin.generateLink({
				type: 'magiclink',
				email,
				options: { redirectTo: getURL() },
			});

			if (error) {
				throw error;
			}

			const { properties } = data;
			const { action_link } = properties;

			try {
				if (!user.new_signup_email) {
					await resend.sendEmail({
						from: emails.from,
						subject: emails.welcome.subject,
						to: user.email,
						react: WelcomeEmail(),
					});
					await prisma.users.update({
						where: { id: user.id },
						data: { new_signup_email: true },
					});
				}
				await resend.sendEmail({
					from: emails.from,
					subject: emails.login.subject,
					to: email,
					react: SignInEmail({ action_link }),
				});
				return NextResponse.json({ message: emails.sent });
			} catch (err: any) {
				throw err;
			}
		} catch (error: any) {
			return NextResponse.json(
				{ message: String(error) || messages.error },
				{ status: 500 }
			);
		}
	} else {
		return NextResponse.json(
			{ message: messages.account.doesntexist },
			{ status: 404 }
		);
	}
}