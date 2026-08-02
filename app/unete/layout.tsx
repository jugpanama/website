import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Participa en la comunidad',
  description: 'Conoce cómo participar en Panama JUG como asistente, speaker, colaborador o proponiendo temas técnicos.',
  alternates: { canonical: '/unete' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
