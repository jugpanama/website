import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getUpcomingEventsFromMarkdown } from '@/lib/content'
import { MapPin, Clock, Tag, ExternalLink, ArrowRight, Radio } from 'lucide-react'

const typeLabel: Record<string, string> = {
  virtual: 'Virtual',
  presencial: 'Presencial',
  hibrido: 'Híbrido',
}

export default function EventosProximosPage() {
  const upcomingEvents = getUpcomingEventsFromMarkdown()
  const nextEvent = upcomingEvents[0] ?? null

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Eventos abiertos
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-2">Próximos eventos</h1>
          <p className="max-w-3xl text-[#6C757D] mb-8 md:mb-10">
            Revisa la agenda activa, explora cada meetup y abre el registro cuando estés listo. Cuando un evento tenga formulario embebido, también podrás completar la inscripción desde esta misma página.
          </p>

          {nextEvent && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white shadow-sm">
              <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/15 bg-[#2F4F7A]/6 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#22385A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
                    Próximo en agenda
                  </p>
                  <h2 className="mb-2 text-lg font-semibold leading-snug text-[#212529] sm:text-xl">
                    {nextEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#6C757D]">
                    <span className="font-mono text-[#2F4F7A]">{nextEvent.displayDate ?? 'Fecha por confirmar'}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#2F4F7A]" />
                      {nextEvent.time ?? 'Hora por confirmar'}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#2F4F7A]" />
                      {nextEvent.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end md:text-right">
                  <a
                    href={`#${nextEvent.id}`}
                    className="focus-ring tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                  >
                    Ver detalles del meetup
                  </a>
                  <Link
                    href="/"
                    className="focus-ring inline-flex items-center justify-center rounded-md px-1 py-1 text-sm font-medium text-[#2F4F7A] transition-colors hover:text-[#22385A]"
                  >
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          )}

          {upcomingEvents.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#CED4DA] bg-white p-8 text-center">
              <h2 className="text-xl font-bold text-[#212529] mb-2">No hay eventos abiertos en este momento</h2>
              <p className="mx-auto max-w-2xl text-sm text-[#6C757D] mb-6">
                Cuando publiquemos nuevos meetups aparecerán aquí con su registro y detalles de participación.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
              >
                Volver al inicio
              </Link>
            </div>
          )}

          <div className="space-y-10">
            {upcomingEvents.map((event) => {
              const registrationUrl = event.lumaEventId
                ? `https://lu.ma/${event.lumaEventId}`
                : event.lumaEmbedUrl
              const livestreamUrl = event.youtubeLiveUrl ?? event.youtubeEmbedUrl
              const canRegister = !!registrationUrl && !!event.registrationOpen
              const canStream = !!livestreamUrl && !!event.streamOpen

              return (
                <article
                  key={event.id}
                  id={event.id}
                  className="bg-white rounded-2xl border border-[#E9ECEF] shadow-sm overflow-hidden"
                >
                {/* Header */}
                <div className="bg-[#2F4F7A] px-5 py-5 md:px-8 md:py-6">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="font-mono text-sm text-[#F89820] bg-[#22385A] px-3 py-1 rounded">
                      {event.displayDate ?? 'Fecha por confirmar'}
                    </span>
                    <span className="text-xs font-medium text-white border border-white/30 px-2 py-1 rounded">
                      {typeLabel[event.type] ?? event.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-[#CED4DA] text-sm">
                    {event.speakerName} · {event.speakerCompany}
                  </p>
                </div>

                <div className="px-5 py-5 md:px-8 md:py-6">
                  <p className="text-[#495057] mb-5">{event.description}</p>

                  <div className="flex flex-wrap gap-5 text-sm text-[#6C757D] mb-5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {event.time ?? 'Hora por confirmar'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {event.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#6C757D] bg-[#F1F3F5] px-2.5 py-1 rounded-full"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {canStream ? (
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#E9ECEF] bg-[#F8F9FA] px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#212529]">Transmisión del evento</p>
                        <p className="text-xs text-[#6C757D]">La transmisión se abre en YouTube en una nueva pestaña.</p>
                      </div>
                      <a
                        href={livestreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                      >
                        Ver transmisión
                        <Radio className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : canRegister ? (
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#E9ECEF] bg-[#F8F9FA] px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#212529]">Registro del evento</p>
                        <p className="text-xs text-[#6C757D]">El registro se abre en Luma en una nueva pestaña.</p>
                      </div>
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                      >
                        Abrir registro
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="mb-5 rounded-xl border border-dashed border-[#CED4DA] bg-[#F8F9FA] px-4 py-4">
                      <p className="text-sm font-semibold text-[#212529]">
                        {event.type === 'virtual' ? 'Transmisión no disponible por ahora' : 'Registro no disponible por ahora'}
                      </p>
                      <p className="mt-1 text-xs text-[#6C757D]">
                        {event.type === 'virtual'
                          ? 'Este meetup virtual está en agenda, pero la transmisión de YouTube todavía no está activa.'
                          : 'Este evento está en agenda, pero el formulario de inscripción todavía no está activo.'}
                      </p>
                    </div>
                  )}

                  {/* Embedded Experience */}
                  {canStream && event.youtubeEmbedUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#E9ECEF] mb-4">
                      <iframe
                        src={event.youtubeEmbedUrl}
                        width="100%"
                        height="760"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        title={`Transmisión: ${event.title}`}
                        className="block h-[520px] sm:h-[680px] lg:h-[760px]"
                      />
                    </div>
                  )}

                  {canRegister && event.lumaEmbedUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#E9ECEF] mb-4">
                      <iframe
                        src={event.lumaEmbedUrl}
                        width="100%"
                        height="760"
                        frameBorder="0"
                        style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
                        allow="fullscreen; payment"
                        aria-hidden="false"
                        tabIndex={0}
                        title={`Registro: ${event.title}`}
                        className="block h-[520px] sm:h-[680px] lg:h-[760px]"
                      />
                    </div>
                  )}

                  {(canStream || canRegister) && (
                    <div className="flex justify-end">
                      <a
                        href={canStream ? livestreamUrl : registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F4F7A] hover:underline"
                      >
                        {canStream ? 'Abrir transmisión en YouTube' : 'Abrir registro en Luma'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}

                </div>
                </article>
              )
            })}
          </div>
        </div>
      </main>

      <Footer nextEvent={nextEvent} />
    </div>
  )
}
