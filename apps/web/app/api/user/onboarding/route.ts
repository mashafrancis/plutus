import { NextRequest, NextResponse } from 'next/server'

import { emails } from '@/constants/messages'
import { WelcomeEmail, sendEmail } from '@plutus/emails'

// type UserData = {
//   email: string
//   id: string
//   new_signup_email: boolean
// }

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  // const user = (await db.users.findFirst({
  // 	where: { email },
  // 	select: { email: true, id: true, new_signup_email: true },
  // })) as UserData;

  try {
    await sendEmail({
      from: emails.from,
      subject: emails.welcome.subject,
      to: email,
      react: WelcomeEmail(),
    })
    // await db.users.update({
    // 	where: { id: user.id },
    // 	data: { new_signup_email: true },
    // });
    return NextResponse.json({ message: emails.sent })
  } catch (err: any) {
    throw err
  }
}
