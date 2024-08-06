import { authedRoutes } from '@/routes'
import { updateSession } from '@plutus/supabase/middleware'
import { createClient } from '@plutus/supabase/server'
import { createI18nMiddleware } from 'next-international/middleware'
import { type NextRequest, NextResponse } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
})

export async function middleware(request: NextRequest) {
  const response = await updateSession(request, I18nMiddleware(request))

  const supabase = createClient()

  const nextUrl = request.nextUrl

  const pathnameLocale = nextUrl.pathname.split('/', 2)?.[1] as string

  // Remove the locale from the pathname
  const pathnameWithoutLocale = nextUrl.pathname.slice(
    pathnameLocale.length + 1,
  )

  // Create a new URL without the locale in the pathname
  const newUrl = new URL(pathnameWithoutLocale || '/', request.url)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthedRoute = authedRoutes.includes(pathnameWithoutLocale)

  // Not authenticated
  if (!session && isAuthedRoute) {
    const encodedSearchParams = `${newUrl.pathname.substring(1)}${
      newUrl.search
    }`

    const url = new URL('/', request.url)

    if (encodedSearchParams) {
      url.searchParams.append('return_to', encodedSearchParams)
    }

    return NextResponse.redirect(url)
  }

  return response
}

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)'],
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|monitoring|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
