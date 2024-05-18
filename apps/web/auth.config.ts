import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@plutus/db'
import { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'

type UserData = {
  email: string
  id: string
  new_signup_email: boolean
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Resend({
      from: 'no-reply@plutus.com',
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth }) {
      let user = null
      const isLoggedIn = !!auth?.user

      if (isLoggedIn) {
        const email = auth?.user?.email as string

        user = (await db.users.findFirst({
          where: { email },
          select: { email: true, id: true, new_signup_email: true },
        })) as UserData

        if (!user) {
          await db.users.create({
            data: {
              id: auth?.user?.id,
              email,
              new_signup_email: true,
            },
          })
        }

        if (user.new_signup_email) {
          // await sendEmail({
          //   from: emails.from,
          //   subject: emails.welcome.subject,
          //   to: [email],
          //   react: WelcomeEmail(),
          // })
          await db.users.update({
            where: { id: user.id },
            data: { new_signup_email: false },
          })
        }
      }
      return true
    },
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  trustHost: true,
} satisfies NextAuthConfig
