import { getSession } from "@/auth/server";
import { getLocale } from "@/lib/location";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createI18nMiddleware({
    defaultLocale: "en",
    locales: [await getLocale()],
    urlMappingStrategy: "rewrite",
    resolveLocaleFromRequest: (request) => {
      return request.headers.get("x-user-locale") || "en";
    },
  });

  const response = handleI18nRouting(request);
  const url = new URL("/", request.url);
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

  const session = await getSession();

  if (
    !session?.session.id &&
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
  matcher: [
    "/((?!_next/static|_next/image|monitoring|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
