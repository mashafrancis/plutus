import { Resend } from 'resend'
import { env } from '../env'

const resend = new Resend(env.RESEND_API_KEY)

export interface Emails {
  react: JSX.Element
  subject: string
  to: string[]
  from: string
  reply_to?: string
}

export type EmailHtml = {
  html: string
  subject: string
  to: string[]
  from: string
}

export const sendEmail = async (email: Emails) => {
  await resend.emails.send(email)
}

export const sendEmailHtml = async (email: EmailHtml) => {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      to: email.to,
      from: email.from,
      subject: email.subject,
      html: email.html,
    }),
  })
}
