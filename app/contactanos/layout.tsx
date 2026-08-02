import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Participa en Panama JUG',
  description: 'Propón un tema, comparte una idea técnica o participa en la comunidad Java de Panamá.',
  alternates: { canonical: '/contactanos' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
