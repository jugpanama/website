import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Panama JUG',
  description: 'La comunidad Java y JVM más activa de Panamá. Eventos, talleres y networking para desarrolladores.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    url: 'https://panamajug.org',
    siteName: 'Panama JUG',
    title: 'Panama JUG',
    description: 'La comunidad Java y JVM más activa de Panamá. Eventos, talleres y networking para desarrolladores.',
    images: [
      {
        url: 'https://panamajug.org/portada-web-social.png',
        width: 1200,
        height: 630,
        alt: 'Portada Panama JUG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panama JUG',
    description: 'La comunidad Java y JVM más activa de Panamá. Eventos, talleres y networking para desarrolladores.',
    images: ['https://panamajug.org/portada-web-social.png'],
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
      </body>
    </html>
  )
}
