import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Próximos eventos Java en Panamá',
  description: 'Actividades técnicas de Panama JUG sobre Java, JVM, Jakarta EE y Cloud Native. Los eventos se publican cuando sus detalles están confirmados.',
  alternates: { canonical: '/eventos/proximos' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
