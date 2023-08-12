import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Database } from '@/lib/database.types';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /_static (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
	],
};

export async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>({ req, res });
	await supabase.auth.getSession();
	const supabaseSession = await supabase.auth.getSession();
	const session = supabaseSession.data.session;

	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	const hostname = req.headers
		.get('host')!
		.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = url.pathname;

	// rewrites for app pages
	if (hostname == `plutus.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
		// if (!session && path !== '/login') {
		// 	return NextResponse.redirect(new URL('/login', req.url));
		// } else if (session && path == '/login') {
		// 	return NextResponse.redirect(new URL('/', req.url));
		// }
		return NextResponse.rewrite(
			new URL(`${path === '/' ? '' : path}`, req.url)
		);
	}

	return res;
}
