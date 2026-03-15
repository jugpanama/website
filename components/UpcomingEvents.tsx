'use client'

import Link from 'next/link'
import type { Event } from '@/lib/data'
import { MapPin, Clock, ArrowRight, ExternalLink, Radio } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const typeLabel: Record<Event['type'], string> = {
  virtual: 'Virtual',
  presencial: 'Presencial',
  hibrido: 'Híbrido',
}

export default function UpcomingEvents({ upcomingEvents }: { upcomingEvents: Event[] }) {
  const [headerRef, headerInView] = useInView()
  const [cardsRef, cardsInView] = useInView()
  const cardsLayoutClass =
    upcomingEvents.length <= 1
      ? 'max-w-[640px] grid-cols-1'
      : upcomingEvents.length === 2
        ? 'max-w-[960px] grid-cols-1 md:grid-cols-2'
        : 'max-w-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section
      id="eventos"
      aria-labelledby="upcoming-events-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#355B8F_0%,#2F4F7A_55%,#274269_100%)] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_65%_at_5%_0%,rgba(248,152,32,0.14)_0%,rgba(248,152,32,0)_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
              Próximos eventos
            </p>
            <h2 id="upcoming-events-title" className="text-3xl md:text-4xl font-bold text-white">
              No te pierdas lo que viene
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#D7E1EE] md:text-base">
              Revisa la próxima agenda de la comunidad, con detalles de speaker, modalidad y acciones disponibles para registro o transmisión.
            </p>
            <Link
              href="/eventos/proximos"
              className="focus-ring-inverse mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#F8B04A]/45 bg-[#22385A]/30 px-5 py-2.5 text-[#FFD08A] font-semibold transition-colors hover:border-[#F8B04A] hover:text-white sm:w-auto"
            >
              Ver agenda completa <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {upcomingEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/25 bg-[#22385A]/45 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Aún no hay sesiones próximas publicadas</h3>
            <p className="mx-auto max-w-2xl text-sm text-[#D7E1EE] mb-6">
              Cuando publiquen el siguiente evento en Markdown, aparecerá automáticamente aquí.
            </p>
            <Link
              href="/contactanos"
              className="focus-ring-inverse inline-flex items-center justify-center rounded bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
            >
              Contactar al equipo
            </Link>
          </div>
        )}

        {/* Event Cards Grid */}
        <div ref={cardsRef} className={`mx-auto grid gap-6 ${cardsLayoutClass} ${upcomingEvents.length === 0 ? 'hidden' : ''}`}>
          {upcomingEvents.map((event, i) => {
            const registrationUrl =
              event.lumaEventId ? `https://lu.ma/${event.lumaEventId}` : event.lumaEmbedUrl
            const livestreamUrl = event.youtubeLiveUrl ?? event.youtubeEmbedUrl
            const canRegister = !!registrationUrl && !!event.registrationOpen
            const canStream = !!livestreamUrl && !!event.streamOpen
            const actionLabel = canStream
              ? 'Ver transmisión'
              : canRegister
                ? 'Abrir registro'
                : event.type === 'virtual'
                  ? 'Transmisión próximamente'
                  : 'Registro próximamente'

            return (
              <article
                key={event.id}
                className={`card-hover flex flex-col rounded-2xl border border-white/16 bg-[linear-gradient(180deg,rgba(70,110,164,0.92)_0%,rgba(44,74,114,0.96)_100%)] p-5 sm:p-6 shadow-[0_16px_36px_-20px_rgba(0,0,0,0.55)] transition-all duration-700 ease-out ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: cardsInView ? `${i * 110}ms` : '0ms' }}
              >
                {/* Date and type */}
                <div className="mb-4 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md bg-[#1A2E4A] px-3 py-1.5 font-mono text-sm tracking-[0.04em] text-[#F8B04A]">
                    {event.displayDate ?? 'Fecha por confirmar'}
                  </span>
                  <span className="rounded-md border border-[#F8B04A]/55 bg-[#F8B04A]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#FFD08A]">
                    {typeLabel[event.type]}
                  </span>
                </div>

                {/* Main content */}
                <h3 className="mb-2 text-xl font-bold leading-snug text-white">
                  {event.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#D7E1EE]">
                  {event.description}
                </p>

                {/* Speaker block */}
                <div className="mb-4 rounded-lg border border-white/12 bg-[#22385A]/48 p-3.5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#AFC4DD]">Speaker</p>
                  <p className="mt-1 text-sm font-semibold text-white">{event.speakerName}</p>
                  <p className="text-sm text-[#D7E1EE]">{event.speakerCompany}</p>
                </div>

                {/* Time/location block */}
                <div className="mb-5 grid grid-cols-1 gap-2.5 text-sm text-[#E6EDF7] sm:grid-cols-2">
                  <span className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#1F3552]/55 px-3 py-2">
                    <Clock className="h-4 w-4 text-[#F8B04A]" />
                    {event.time ?? 'Hora por confirmar'}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#1F3552]/55 px-3 py-2">
                    <MapPin className="h-4 w-4 text-[#F8B04A]" />
                    {event.location}
                  </span>
                </div>

                {/* Tags */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {event.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/12 bg-[#22385A]/45 px-2.5 py-1 text-xs font-medium text-[#D7E1EE]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-auto border-t border-white/12 pt-4">
                  {canStream ? (
                    <a
                      href={livestreamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir transmisión del evento ${event.title} en YouTube`}
                      className="focus-ring-inverse tap-target inline-flex w-full items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                    >
                      {actionLabel}
                      <Radio className="h-3.5 w-3.5" />
                    </a>
                  ) : canRegister ? (
                    <a
                      href={registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir registro del evento ${event.title} en Luma`}
                      className="focus-ring-inverse tap-target inline-flex w-full items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                    >
                      Abrir registro
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-[#D7E1EE]">
                      {actionLabel}
                    </span>
                  )}
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
