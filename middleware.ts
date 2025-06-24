import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { auth } from "@/auth/server";
import { getLocale } from "@/lib/location";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const handleI18nRouting = createI18nMiddleware({
    defaultLocale: "en",
    locales: [await getLocale()],
    urlMappingStrategy: "rewrite",
    resolveLocaleFromRequest: (request) => {
      return request.headers.get("x-user-locale") || "en";
    },
  });

  const response = handleI18nRouting(request);
  const _url = new URL("/", request.url);
  const nextUrl = request.nextUrl;

  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];

  // Remove the locale from the pathname
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;

  // Create a new URL without the locale in the pathname
  const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

  const encodedSearchParams = `${newUrl?.pathname?.substring(1)}${
    newUrl.search
  }`;

  if (
    !session &&
    newUrl.pathname !== "/" &&
    newUrl.pathname !== "/login" &&
    !newUrl.pathname.includes("/i/")
  ) {
    const url = new URL("/login", request.url);

    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(url);
  }

  // If all checks pass, return the original or updated response
  return response;
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next/static|_next/image|monitoring|ingest|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
