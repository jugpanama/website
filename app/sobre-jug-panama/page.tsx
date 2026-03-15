"use client"

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Target, Presentation, Handshake } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const meetupGallery: Array<{ src: string; alt: string; caption?: string }> = []
const aboutHighlights = [
  {
    icon: Target,
    title: 'Misión',
    description:
      'Fortalecer el ecosistema Java local con experiencias prácticas, charlas de calidad y una comunidad inclusiva para todos los niveles.',
  },
  {
    icon: Presentation,
    title: 'Qué hacemos',
    description:
      'Meetups mensuales, sesiones virtuales y eventos presenciales con speakers de industria, casos reales y enfoque hands-on.',
  },
  {
    icon: Handshake,
    title: 'Cómo participar',
    description:
      'Puedes asistir a eventos, proponer charlas, apoyar como sponsor o colaborar en la organización de actividades.',
  },
]

export default function SobreJugPanamaPage() {
  const [highlightsRef, highlightsInView] = useInView()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <section className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Sobre Panama JUG
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-4">
            Comunidad Java para aprender, conectar y construir
          </h1>
          <p className="text-[#495057] text-base md:text-lg leading-relaxed max-w-3xl">
            Panama JUG es una comunidad abierta para desarrolladores Java y JVM en Panamá y
            Latinoamérica. Organizamos meetups, talleres y espacios de networking para impulsar
            habilidades técnicas, colaboración y oportunidades profesionales.
          </p>
        </section>

        <section ref={highlightsRef} className="mx-auto max-w-5xl mt-10 grid gap-6 md:grid-cols-3">
          {aboutHighlights.map((highlight, index) => (
            <article
              key={highlight.title}
              className={`card-hover rounded-xl border border-[#E9ECEF] bg-white p-6 transition-all duration-700 ease-out ${highlightsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: highlightsInView ? `${index * 100}ms` : '0ms' }}
            >
              <highlight.icon className="h-8 w-8 text-[#F89820] mb-4" />
              <h2 className="font-semibold text-[#212529] mb-2">{highlight.title}</h2>
              <p className="text-sm text-[#6C757D]">{highlight.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-5xl mt-12">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#212529]">Galería de meetups</h2>
            <span className="text-xs font-mono text-[#6C757D]">Espacio listo para futuras fotos</span>
          </div>

          {meetupGallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {meetupGallery.map((item) => (
                <figure key={item.src} className="bg-white rounded-lg border border-[#E9ECEF] overflow-hidden">
                  <img src={item.src} alt={item.alt} className="h-40 w-full object-cover" />
                  {item.caption && <figcaption className="px-3 py-2 text-xs text-[#6C757D]">{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 md:h-44 rounded-lg border border-dashed border-[#B8C6DA] bg-white/70 flex items-center justify-center text-center px-3"
                >
                  <p className="text-xs text-[#6C757D]">Próximamente foto del meetup presencial</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-5xl mt-12 text-center">
          <Link
            href="/eventos/proximos"
            className="inline-flex items-center justify-center rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white hover:bg-[#DD7A0A] transition-colors"
          >
            Ver agenda
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
