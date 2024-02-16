
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {NextRequest, NextResponse} from "next/server";
export let locales = ['en-US', 'en-FR', 'fr-FR']
let defaultLocale = 'en-US'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {

  let headers = { 'accept-language': 'en-US,en;q=0.5' }
  let languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale) // -> 'en-US'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  console.log('localeInMiddleware', locale)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.rewrite(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
