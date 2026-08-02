import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Participa en la comunidad',
  description: 'Conoce cómo asistir, proponer una charla mediante Sessionize, colaborar técnicamente o conversar con Panama JUG.',
  alternates: { canonical: '/unete' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
