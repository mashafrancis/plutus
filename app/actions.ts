'use server'

import { signIn } from '@/auth'
import { emails } from '@/constants/messages'
import SignInEmail from '@/emails/signin'
import SignUpEmail from '@/emails/signup'
import WelcomeEmail from '@/emails/welcome'
import { apiUrls } from '@/lib/apiUrls'
import resend from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { authSchema } from '@/lib/validations/auth'
import { Tables } from '@/types_db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type FormData = z.infer<typeof authSchema>
type User = Tables<'users'>

export async function authenticate() {
  await signIn('github', {
    callbackUrl: '/overview',
  })
}

export async function login(
  _prevState: string | undefined,
  { email }: FormData,
) {
  const res = await fetch(apiUrls.auth.login, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  })

  return await res.json()
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('Error logging out:', error.message)
    return
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUser(email: string): Promise<User> {
  const supabase = createClient()

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  return user
}

export async function updateUser({
  id,
  data,
}: { id: string; data: Partial<User> }) {
  const supabase = createClient()

  const { data: user } = await supabase
    .from('users')
    .update({ data })
    .eq('id', id)

  return user
}

async function signUpUser(user: User) {
  const { email, new_signup_email } = user
  try {
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: '/' },
    })

    if (error) {
      throw error
    }

    const { properties } = data
    const { action_link } = properties

    try {
      await resend.emails.send({
        from: emails.from,
        subject: emails.register.subject,
        to: [email],
        react: SignUpEmail({ action_link }) as React.ReactElement,
      })
    } catch (err: any) {
      throw err
    }
  } catch (error: any) {
    console.error(error)
  }
}

async function signInUser(user: User) {
  const { email, new_signup_email } = user
  try {
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: '/overview' },
    })

    if (error) {
      throw error
    }

    const { properties } = data
    const { action_link } = properties

    try {
      if (!user.new_signup_email) {
        await resend.emails.send({
          from: emails.from,
          subject: emails.welcome.subject,
          to: [user.email],
          react: WelcomeEmail(),
        })
        await updateUser({ id: user.id, data: { new_signup_email: true } })
      }
      await resend.emails.send({
        from: emails.from,
        subject: emails.login.subject,
        to: [email],
        react: SignInEmail({ action_link }),
      })
    } catch (err: any) {
      throw err
    }
  } catch (error: any) {
    console.error(error)
  }
}
