'use client'

import type { Event } from '@/lib/data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function PastEvents({
  pastEvents,
  totalCount,
}: {
  pastEvents: Event[]
  totalCount?: number
}) {
  const [headerRef, headerInView] = useInView()
  const [cardsRef, cardsInView] = useInView()
  const resolvedTotal = totalCount ?? pastEvents.length
  const shouldShowAllLink = resolvedTotal > 0

  return (
    <section aria-labelledby="past-events-title" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
              Eventos pasados
            </p>
            <h2 id="past-events-title" className="text-3xl md:text-4xl font-bold text-[#212529]">
              Lo que hemos construido juntos
            </h2>
          </div>

          {shouldShowAllLink && (
            <Link
              href="/eventos/pasados"
              className="focus-ring inline-flex items-center rounded-md font-medium text-[#2F4F7A] hover:text-[#22385A]"
            >
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>

        {pastEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#CED4DA] bg-white p-8 text-center">
            <h3 className="text-xl font-bold text-[#212529] mb-2">Aún no tenemos eventos pasados</h3>
            <p className="mx-auto max-w-2xl text-sm text-[#6C757D] mb-6">
              Cuando terminemos nuestro primer meetup, lo publicaremos aquí con su resumen y grabación.
            </p>
            <Link
              href="/eventos/proximos"
              className="focus-ring inline-flex items-center rounded-md bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
            >
              Ver agenda actual
            </Link>
          </div>
        )}

        {/* Events Grid - Horizontal scroll on mobile */}
        <div ref={cardsRef} className={`flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none ${pastEvents.length === 0 ? 'hidden' : ''}`}>
          {pastEvents.map((event, i) => (
            <article
              key={event.id}
              className={`card-hover flex w-[86vw] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#CED4DA] bg-white transition-all duration-700 ease-out sm:w-80 md:w-auto ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: cardsInView ? `${i * 100}ms` : '0ms' }}
            >
              {/* Thumbnail Placeholder */}
              <div className="relative bg-[#2F4F7A] aspect-video flex items-center justify-center">
                <div className="text-center">
                  <span className="text-xl font-bold">
                    <span className="text-white">JUG</span>
                    <span className="text-[#F89820]">Panama</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Date */}
                <p className="font-mono text-xs text-[#6C757D] mb-2">
                  {event.displayDate ?? 'Fecha por confirmar'}
                </p>

                {/* Title */}
                <h3 className="font-semibold text-[#212529] mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6C757D] mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[#6C757D] bg-[#F1F3F5] px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Recording Link */}
                {event.youtubeUrl ? (
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver grabación del evento ${event.title}`}
                    className="focus-ring mt-auto inline-flex items-center rounded-md text-sm font-medium text-[#F89820] hover:text-[#DD7A0A]"
                  >
                    Ver grabación <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  <span className="mt-auto text-sm text-[#ADB5BD] italic">Grabación no disponible</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
