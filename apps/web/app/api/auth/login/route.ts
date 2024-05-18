import { getUser } from '@/app/actions'
import messages, { emails } from '@/constants/messages'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { SignUpEmail } from '@plutus/emails'
import { sendEmail } from '@plutus/emails/emails/send'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  const user = await getUser(email)
  if (user.id) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: '/' },
      })

      if (error) {
        console.error(error)
        throw error
      }

      const { properties } = data
      const { action_link } = properties

      try {
        await sendEmail({
          from: emails.from,
          subject: emails.register.subject,
          to: [email],
          react: SignUpEmail({ action_link }),
        })
        return NextResponse.json({ message: emails.sent })
      } catch (err: any) {
        console.error(err)
        throw err
      }
    } catch (error: any) {
      return NextResponse.json(
        { message: String(error) || messages.error },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json(
      { message: messages.account.exist },
      { status: 500 },
    )
  }
}
