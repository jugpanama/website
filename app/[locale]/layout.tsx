import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
