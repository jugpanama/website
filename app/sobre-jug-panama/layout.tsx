import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre la comunidad Java de Panamá',
  description: 'Conoce Panama JUG, una comunidad abierta enfocada en Java, JVM, Jakarta EE, Cloud Native y Open Source.',
  alternates: { canonical: '/sobre-jug-panama' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
