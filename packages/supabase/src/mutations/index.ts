import { Client, Tables } from '../types'

type User = Tables<'users'>

export async function createUser(supabase: Client) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return
  }

  return supabase
    .from('users')
    .insert({
      id: session.user.id,
      email: session.user.email as string,
    })
    .select()
    .single()
}

export async function updateUser(supabase: Client, data: Partial<User>) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return
  }

  return supabase
    .from('users')
    .update(data)
    .eq('id', session.user.id)
    .select()
    .single()
}
