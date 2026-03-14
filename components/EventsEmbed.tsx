import type { Event } from '@/lib/data'
import { CalendarDays, Clock3, MapPin, Radio, ExternalLink } from 'lucide-react'

export default function EventsEmbed({ nextEvent }: { nextEvent: Event | null }) {
  const registrationUrl = nextEvent?.lumaEventId
    ? `https://lu.ma/${nextEvent.lumaEventId}`
    : nextEvent?.lumaEmbedUrl ?? '/eventos/proximos'
  const livestreamUrl = nextEvent?.youtubeLiveUrl ?? '/eventos/proximos'
  const isLivestream = !!nextEvent?.streamOpen && !!nextEvent?.youtubeEmbedUrl

  if (!nextEvent || (!isLivestream && !nextEvent.lumaEmbedUrl)) return null

  return (
    <section
      id={isLivestream ? 'transmision' : 'registro'}
      aria-labelledby="registration-title"
      className="bg-[#2F4F7A] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            {isLivestream ? 'Transmisión activa' : 'Registro abierto'}
          </p>
          <h2 id="registration-title" className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {nextEvent.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#CED4DA] sm:text-base">
            {isLivestream
              ? 'Este es el espacio en vivo del próximo meetup virtual. Puedes ver la transmisión directamente aquí o abrir YouTube en una nueva pestaña.'
              : 'Este es el formulario de registro del próximo meetup presencial. Completa tus datos en el bloque de abajo para reservar tu cupo en Luma.'}
          </p>
        </div>

        <div className="mx-auto mb-6 grid max-w-[900px] gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#D7E1EE]">
            <p className="mb-1 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#FFD8A6]">
              <CalendarDays className="h-3.5 w-3.5 text-[#F89820]" />
              Fecha
            </p>
            <p className="text-sm font-medium text-white">{nextEvent.displayDate ?? 'Fecha por confirmar'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#D7E1EE]">
            <p className="mb-1 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#FFD8A6]">
              <Clock3 className="h-3.5 w-3.5 text-[#F89820]" />
              Hora
            </p>
            <p className="text-sm font-medium text-white">{nextEvent.time ?? 'Hora por confirmar'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#D7E1EE]">
            <p className="mb-1 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#FFD8A6]">
              <MapPin className="h-3.5 w-3.5 text-[#F89820]" />
              Modalidad
            </p>
            <p className="text-sm font-medium text-white">{nextEvent.location}</p>
          </div>
        </div>

        {/* Embedded Experience */}
        <div className="flex justify-center">
          <div className="w-full max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
            <div className="border-b border-[#E9ECEF] bg-[#F8F9FA] px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold text-[#22385A]">
                {isLivestream ? 'Transmisión en YouTube' : 'Formulario de registro en Luma'}
              </p>
              <p className="mt-1 text-xs text-[#6C757D]">
                {isLivestream
                  ? 'El siguiente bloque reproduce el live del evento y te permite seguir la sesión sin salir de esta página.'
                  : 'El siguiente bloque pertenece al evento y te permite completar la inscripción sin salir de esta página.'}
              </p>
            </div>
            <div className="border-b border-[#E9ECEF] bg-white px-4 py-3 sm:hidden">
              <a
                href={isLivestream ? livestreamUrl : registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  isLivestream
                    ? `Abrir transmisión del evento ${nextEvent.title} en YouTube`
                    : `Abrir registro completo del evento ${nextEvent.title}`
                }
                className="focus-ring tap-target inline-flex w-full items-center justify-center rounded-lg bg-[#F89820] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
              >
                {isLivestream ? 'Abrir en YouTube' : 'Abrir registro completo'}
              </a>
            </div>
            <iframe
              src={isLivestream ? nextEvent.youtubeEmbedUrl : nextEvent.lumaEmbedUrl}
              width="100%"
              height="700"
              frameBorder="0"
              style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
              allow={isLivestream ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' : 'fullscreen; payment'}
              aria-hidden="false"
              tabIndex={0}
              title={isLivestream ? 'Transmisión del evento en YouTube' : 'Registro de evento en Luma'}
              className="block h-[480px] sm:h-[640px] lg:h-[700px]"
            />
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 flex justify-center">
          {isLivestream ? (
            <a
              href={livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring-inverse inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]"
            >
              <Radio className="h-3.5 w-3.5" />
              Ver transmisión en YouTube
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
              Powered by Luma · Registro 100% gratuito
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
