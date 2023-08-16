'use server';

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';
import * as crypto from 'crypto';

const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const createUser = async () => {
	const {
		data: { user },
	} = await supabaseAdmin.auth.getUser();

	const { data, error } = await supabaseAdmin.from('users').insert([
		{
			id: crypto.randomUUID(),
			email: user?.email as string,
		},
	]);
};
