import { Client, Tables, TablesInsert } from '../types'

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

export async function deleteUser(supabase: Client) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return
  }

  await Promise.all([
    supabase.auth.admin.deleteUser(session.user.id),
    supabase.from('users').delete().eq('id', session.user.id),
    supabase.auth.signOut(),
  ])

  return session?.user?.id
}

type CreateExpense = TablesInsert<'expenses'>

export async function createExpense(
  supabase: Client,
  params: Omit<CreateExpense, 'user_id'>,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return
  }

  return supabase
    .from('expenses')
    .insert({
      ...params,
      user_id: session.user.id,
    })
    .select()
    .single()
    .throwOnError()
}

export async function updateExpense(supabase: Client, id: string, data: any) {
  return supabase
    .from('expenses')
    .update(data)
    .eq('id', id)
    .select('id, name, notes, price, category, paid_via, date')
    .single()
}
