'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = createClient()
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser()

  if (!sessionUser) redirect('/')

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', sessionUser.id)
    .single()

  return user
}
