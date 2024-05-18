import { NextRequest, NextResponse } from 'next/server'

import { emails } from '@/constants/messages'
import { checkAuth } from '@/lib/auth'
import db from '@plutus/db'
import { FeedbackEmail, sendEmail } from '@plutus/emails'

export async function POST(request: NextRequest) {
  const { message } = await request.json()
  return await checkAuth(async (user: any) => {
    try {
      await db.feedback.create({ data: { message, user_id: user.id } })
      await sendEmail({
        from: emails.from,
        subject: emails.feedback.subject,
        to: [emails.email],
        reply_to: user.email,
        react: FeedbackEmail({ message, email: user.email }),
      })
      return NextResponse.json(
        { message: emails.feedback.sent },
        { status: 201 },
      )
    } catch (_error: any) {
      return NextResponse.json(
        { error: { message: emails.feedback.failed } },
        { status: 500 },
      )
    }
  })
}
