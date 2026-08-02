import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Código de conducta',
  description: 'Principios para construir una comunidad Panama JUG respetuosa, abierta e inclusiva.',
  alternates: { canonical: '/codigo-de-conducta' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
