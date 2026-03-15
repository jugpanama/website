import { NextResponse } from 'next/server'

export async function GET() {
  const siteKey = process.env.TURNSTILE_SITE_KEY

  if (!siteKey) {
    return NextResponse.json({ siteKey: '' })
  }

  return NextResponse.json({ siteKey })
}
