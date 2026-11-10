import EventosProximosPage from '@/app/eventos/proximos/page'

export default async function LocaleEventosProximosPage({ params }: { params: Promise<{ locale: 'es' | 'en' }> }) {
  const { locale } = await params
  return <EventosProximosPage locale={locale} />
}
