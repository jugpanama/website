import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return
  }

  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0]

  if (locale === 'es' || locale === 'en') {
    return intlMiddleware(request)
  }

  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/es'
    return Response.redirect(url)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/es${pathname}`
  return Response.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}