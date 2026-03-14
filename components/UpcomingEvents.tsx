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
    <section id="eventos" aria-labelledby="upcoming-events-title" className="bg-[#2F4F7A] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
              Próximos eventos
            </p>
            <h2 id="upcoming-events-title" className="text-3xl md:text-4xl font-bold text-white">
              No te pierdas lo que viene
            </h2>
          </div>
          <Link
            href="/eventos/proximos"
            className="focus-ring-inverse mt-4 inline-flex items-center rounded-md text-[#F8B04A] font-medium hover:text-white md:mt-0"
          >
            Ver agenda completa <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div ref={cardsRef} className={`mx-auto grid gap-6 ${cardsLayoutClass}`}>
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
                className={`card-hover flex flex-col rounded-2xl border border-white/10 bg-[linear-gradient(180deg,_rgba(64,101,152,1)_0%,_rgba(47,79,122,1)_100%)] p-5 sm:p-6 transition-all duration-700 ease-out ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: cardsInView ? `${i * 110}ms` : '0ms' }}
              >
              {/* Date Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-[#F89820] bg-[#22385A] px-3 py-1 rounded">
                  {event.displayDate}
                </span>
                <span className="text-xs font-medium text-[#F89820] border border-[#F89820] px-2 py-1 rounded">
                  {typeLabel[event.type]}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold leading-snug text-white">
                {event.title}
              </h3>

              {/* Speaker */}
              <p className="mb-4 text-sm leading-relaxed text-[#D7E1EE]">
                Speaker: {event.speakerName} · {event.speakerCompany}
              </p>

              {/* Time and Location */}
              <div className="flex flex-wrap gap-4 text-sm text-[#CED4DA] mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
              </div>

              {/* Register Button */}
              <div className="mt-auto">
                {canStream ? (
                  <a
                    href={livestreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir transmisión del evento ${event.title} en YouTube`}
                    className="focus-ring-inverse tap-target inline-flex w-full items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A] sm:w-auto"
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
                    className="focus-ring-inverse tap-target inline-flex w-full items-center justify-center gap-2 rounded bg-[#F89820] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A] sm:w-auto"
                  >
                    Abrir registro
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-[#D7E1EE]">
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
