'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Megaphone, Users, Sparkles } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const sponsorBenefits = [
  {
    icon: Megaphone,
    title: 'Visibilidad de marca',
    description: 'Presencia en eventos, comunicaciones y espacios de networking.',
  },
  {
    icon: Users,
    title: 'Conexión con talento',
    description: 'Interacción directa con perfiles técnicos de Java y backend.',
  },
  {
    icon: Sparkles,
    title: 'Impacto en comunidad',
    description: 'Apoyo tangible al crecimiento tecnológico de Panamá.',
  },
]

export default function ConvierteteEnSponsorPage() {
  const [submitted, setSubmitted] = useState(false)
  const [benefitsRef, benefitsInView] = useInView()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <section className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Programa de sponsors
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-4">
            Conviértete en sponsor de JUG Panama
          </h1>
          <p className="text-[#495057] text-base md:text-lg leading-relaxed max-w-3xl">
            Ayuda a impulsar el ecosistema Java local y conecta tu marca con una comunidad técnica
            activa de desarrolladores, equipos de ingeniería y líderes de tecnología.
          </p>
        </section>

        <section ref={benefitsRef} className="mx-auto max-w-5xl mt-10 grid gap-6 md:grid-cols-3">
          {sponsorBenefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`card-hover rounded-2xl border border-[#E9ECEF] bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8F9FA_100%)] p-6 transition-all duration-700 ease-out ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: benefitsInView ? `${index * 100}ms` : '0ms' }}
            >
              <benefit.icon className="h-8 w-8 text-[#F89820] mb-4" />
              <h2 className="font-semibold text-[#212529] mb-2">{benefit.title}</h2>
              <p className="text-sm text-[#6C757D]">{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-5xl mt-10 bg-white rounded-2xl border border-[#E9ECEF] p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center" aria-live="polite">
              <h2 className="mb-2 text-2xl font-bold text-[#212529]">Recibimos tu solicitud</h2>
              <p className="mb-6 text-[#6C757D]">Gracias por escribirnos. Te responderemos por correo en 24-48 horas.</p>
              <Link href="/" className="focus-ring tap-target inline-flex rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#212529] mb-1">Formulario de sponsor</h2>
              <p className="text-sm text-[#6C757D] mb-6">Completa este formulario y te responderemos por correo en 24-48 horas.</p>

              <form
                className="grid gap-5 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#212529] mb-1.5">Nombre completo</label>
                  <input id="fullName" required className="form-field" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#212529] mb-1.5">Correo</label>
                  <input id="email" type="email" required className="form-field" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#212529] mb-1.5">Empresa</label>
                  <input id="company" required className="form-field" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#212529] mb-1.5">Sitio web</label>
                  <input id="website" type="url" placeholder="https://" className="form-field" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="interest" className="block text-sm font-medium text-[#212529] mb-1.5">Tipo de interés</label>
                  <select id="interest" className="form-field tap-target">
                    <option>Patrocinio anual</option>
                    <option>Patrocinio por evento</option>
                    <option>Alianza de contenido</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-[#212529] mb-1.5">Mensaje</label>
                  <textarea id="message" required rows={4} className="form-field min-h-32 resize-none" placeholder="Cuéntanos qué tipo de colaboración tienen en mente..." />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
                  <p className="text-xs text-[#6C757D]">Tus datos solo se usarán para responder esta solicitud. No compartiremos tu información con terceros.</p>
                  <button type="submit" className="focus-ring tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]">
                    Enviar solicitud
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
