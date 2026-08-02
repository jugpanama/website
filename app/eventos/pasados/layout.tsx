import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eventos y grabaciones',
  description: 'Archivo de actividades, resúmenes y grabaciones de la comunidad Java User Group Panamá.',
  alternates: { canonical: '/eventos/pasados' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
