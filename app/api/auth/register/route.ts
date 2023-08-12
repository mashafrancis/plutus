import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import SignUpEmail from '@/emails/signup';

import resend from '@/lib/email';

import messages, { emails } from '@/constants/messages';
import { Database } from '@/lib/database.types';
import { prisma } from '@/lib/db';
import { getURL } from '@/lib/helpers';
import { env } from '@/env.mjs';

const supabaseAdmin = createClient<Database>(
	env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	env.SUPABASE_SERVICE_ROLE_KEY ?? '',
	{ auth: { persistSession: false } }
);

export async function POST(request: NextRequest) {
	const { email } = await request.json();
	const user = await prisma.users.findFirst({
		where: { email },
		select: { email: true },
	});

	console.log('Class: POST, Function: POST, Line 27 user():', user);

	if (!user) {
		try {
			const { data, error } = await supabaseAdmin.auth.admin.generateLink({
				type: 'magiclink',
				email,
				options: { redirectTo: getURL() },
			});

			console.log('Class: POST, Function: POST, Line 37 ():', data, error);

			if (error) {
				throw error;
			}

			const { properties } = data;
			const { action_link } = properties;

			console.log(
				'Class: POST, Function: POST, Line 46 action_link():',
				action_link
			);

			try {
				await resend.sendEmail({
					from: emails.from,
					subject: emails.register.subject,
					to: email,
					react: SignUpEmail({ action_link }),
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
			{ message: messages.account.exist },
			{ status: 500 }
		);
	}
}