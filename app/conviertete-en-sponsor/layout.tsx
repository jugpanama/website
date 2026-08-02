import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colaboración institucional',
  description: 'Información para organizaciones interesadas en apoyar responsablemente el crecimiento de Panama JUG.',
  alternates: { canonical: '/conviertete-en-sponsor' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
