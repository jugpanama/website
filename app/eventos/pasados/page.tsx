import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPastEventsFromMarkdown, getUpcomingEventsFromMarkdown } from '@/lib/content'
import { ArrowRight, Clock, MapPin, PlayCircle } from 'lucide-react'

const typeLabel: Record<string, string> = {
  virtual: 'Virtual',
  presencial: 'Presencial',
  hibrido: 'Híbrido',
}

export default function EventosPasadosPage() {
  const pastEvents = getPastEventsFromMarkdown()
  const nextEvent = getUpcomingEventsFromMarkdown()[0] ?? null

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Historial de eventos
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-3">Eventos pasados</h1>
          <p className="max-w-3xl text-[#6C757D] mb-8 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
            Explora las sesiones que ya realizamos como comunidad, revisa sus temas y accede a las grabaciones disponibles para volver a verlas cuando quieras.
          </p>

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/eventos/proximos"
              className="inline-flex items-center justify-center rounded bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
            >
              Ver agenda actual
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded border border-[#CED4DA] bg-white px-5 py-3 text-sm font-semibold text-[#22385A] transition-colors hover:border-[#2F4F7A] hover:text-[#2F4F7A]"
            >
              Volver al inicio
            </Link>
          </div>

          {pastEvents.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#CED4DA] bg-white p-8 text-center">
              <h2 className="text-xl font-bold text-[#212529] mb-2">Aún no hay eventos archivados</h2>
              <p className="mx-auto max-w-2xl text-sm text-[#6C757D] mb-6">
                Cuando publiquemos grabaciones o movamos sesiones al historial, aparecerán aquí con sus detalles y enlaces disponibles.
              </p>
              <Link
                href="/eventos/proximos"
                className="inline-flex items-center justify-center rounded bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
              >
                Ver agenda actual
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <article
                key={event.id}
                className="card-hover overflow-hidden rounded-2xl border border-[#CED4DA] bg-white flex flex-col"
              >
                <div className="relative flex aspect-video items-center justify-center bg-[linear-gradient(180deg,_#3A5F91_0%,_#2F4F7A_60%,_#22385A_100%)] px-5">
                  <div className="text-center">
                    <span className="text-xl font-bold tracking-tight">
                      <span className="text-white">JUG</span>
                      <span className="text-[#F89820]">Panama</span>
                    </span>
                    <p className="mt-2 text-xs font-mono uppercase tracking-[0.14em] text-[#D7E1EE]">
                      {typeLabel[event.type] ?? event.type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-5 sm:p-6">
                  <p className="mb-3 font-mono text-xs text-[#6C757D]">{event.displayDate ?? 'Fecha por confirmar'}</p>

                  <h2 className="mb-2 text-lg font-semibold leading-snug text-[#212529] line-clamp-2">{event.title}</h2>

                  <p className="mb-4 text-sm leading-relaxed text-[#6C757D] line-clamp-3">{event.description}</p>

                  <div className="mb-4 space-y-2 text-sm text-[#6C757D]">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#2F4F7A]" />
                      {event.time ?? 'Hora por confirmar'}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#2F4F7A]" />
                      {event.location}
                    </p>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-[#6C757D] bg-[#F1F3F5] px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {event.youtubeUrl ? (
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#F89820] hover:underline"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Ver grabación <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="mt-auto text-sm italic text-[#ADB5BD]">Grabación no disponible</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer nextEvent={nextEvent} />
    </div>
  )
}
