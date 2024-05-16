import { getUser } from '@/app/actions'
import messages, { emails } from '@/constants/messages'
import SignUpEmail from '@/emails/signup'
import { sendEmail } from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase/admin'
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
          react: SignUpEmail({ action_link }) as React.ReactElement,
        })

        // const { data, error } = await resend.emails.send({
        //   from: emails.from,
        //   subject: emails.register.subject,
        //   to: [email],
        //   html: await renderAsync(
        //     SignUpEmail({ action_link }) as React.ReactElement,
        //   ),
        //   // html: '<strong>It works!</strong>',
        //   // react: SignUpEmail({ action_link }) as React.ReactElement,
        // })
        //
        // if (error) {
        //   return console.error({ error })
        // }
        //
        // console.log({ data })
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
