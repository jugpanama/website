import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://panamajug.org'),
  title: {
    default: 'Panama JUG | Comunidad Java en Panamá',
    template: '%s | Panama JUG',
  },
  description: 'Panama JUG es la comunidad técnica de Java y JVM en Panamá. Compartimos contenido sobre Java, Jakarta EE, Cloud Native y Open Source, y preparamos futuras actividades comunitarias.',
  keywords: ['Java Panamá', 'Java User Group Panamá', 'Panama JUG', 'Jakarta EE', 'JVM', 'Cloud Native', 'Open Source'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    url: 'https://panamajug.org',
    siteName: 'Panama JUG',
    title: 'Panama JUG | Comunidad Java en Panamá',
    description: 'Comunidad técnica de Java y JVM en Panamá, con contenido sobre Jakarta EE, Cloud Native y Open Source.',
    images: [
      {
        url: 'https://panamajug.org/og.png',
        width: 1200,
        height: 630,
        alt: 'Panama JUG, comunidad técnica de Java, JVM, Jakarta EE y Cloud Native en Panamá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panama JUG | Comunidad Java en Panamá',
    description: 'Comunidad técnica de Java y JVM en Panamá, con contenido sobre Jakarta EE, Cloud Native y Open Source.',
    images: ['https://panamajug.org/og.png'],
  },
  icons: {
    icon: [{ url: '/jugpanlogo.png', type: 'image/png' }],
    shortcut: '/jugpanlogo.png',
    apple: '/jugpanlogo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2F4F7A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="focus-ring sr-only fixed left-4 top-4 z-[100] rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#22385A] shadow-lg focus:not-sr-only"
        >
          Saltar al contenido principal
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
