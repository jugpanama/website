import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

type Locale = 'es' | 'en'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`@/messages/${locale}.json`)).default
  const isEnglish = locale === 'en'
  const title = isEnglish
    ? 'Panama JUG | Java Community in Panama'
    : 'Panama JUG | Comunidad Java en Panamá'
  const description = messages.home.subheadline
  const canonical = `/${locale}`
  const socialImage = isEnglish ? '/og-en.png' : '/og.png'

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_PA',
      url: canonical,
      siteName: 'Panama JUG',
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: isEnglish
            ? 'Panama JUG, Java and JVM technical community in Panama'
            : 'Panama JUG, comunidad técnica de Java y JVM en Panamá',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  }
}

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
