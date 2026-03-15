'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
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
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [benefitsRef, benefitsInView] = useInView()
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('')

  useEffect(() => {
    let isMounted = true

    void fetch('/api/turnstile/config', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) {
          return { siteKey: '' }
        }

        return (await response.json()) as { siteKey?: string }
      })
      .then((data) => {
        if (!isMounted) {
          return
        }

        setTurnstileSiteKey(data.siteKey ?? '')
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setTurnstileSiteKey('')
      })

    return () => {
      isMounted = false
    }
  }, [])

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
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsSending(true)
                  setErrorMessage('')

                  const form = e.currentTarget
                  const formData = new FormData(form)
                  const payload = {
                    fullName: String(formData.get('fullName') ?? ''),
                    email: String(formData.get('email') ?? ''),
                    company: String(formData.get('company') ?? ''),
                    websiteUrl: String(formData.get('websiteUrl') ?? ''),
                    interest: String(formData.get('interest') ?? ''),
                    message: String(formData.get('message') ?? ''),
                    website: String(formData.get('website') ?? ''),
                    captchaToken: String(formData.get('cf-turnstile-response') ?? ''),
                  }

                  if (!payload.captchaToken) {
                    setErrorMessage('Completa el captcha antes de enviar.')
                    setIsSending(false)
                    return
                  }

                  try {
                    const response = await fetch('/api/sponsor', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })

                    if (!response.ok) {
                      const body = (await response.json().catch(() => null)) as { error?: string } | null
                      throw new Error(body?.error ?? 'No se pudo enviar la solicitud.')
                    }

                    form.reset()
                    setSubmitted(true)
                  } catch (error) {
                    const message = error instanceof Error ? error.message : 'No se pudo enviar la solicitud.'
                    setErrorMessage(message)
                  } finally {
                    setIsSending(false)
                  }
                }}
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#212529] mb-1.5">Nombre completo</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    className="form-field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#212529] mb-1.5">Correo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                    className="form-field"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#212529] mb-1.5">Empresa</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    minLength={2}
                    maxLength={140}
                    className="form-field"
                  />
                </div>
                <div>
                  <label htmlFor="websiteUrl" className="block text-sm font-medium text-[#212529] mb-1.5">Sitio web</label>
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    autoComplete="url"
                    inputMode="url"
                    maxLength={2048}
                    placeholder="https://"
                    className="form-field"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="interest" className="block text-sm font-medium text-[#212529] mb-1.5">Tipo de interés</label>
                  <select id="interest" name="interest" required className="form-field tap-target">
                    <option>Patrocinio anual</option>
                    <option>Patrocinio por evento</option>
                    <option>Alianza de contenido</option>
                    <option>Otro</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-[#212529] mb-1.5">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    minLength={10}
                    maxLength={5000}
                    className="form-field min-h-32 resize-none"
                    placeholder="Cuéntanos qué tipo de colaboración tienen en mente..."
                  />
                </div>
                {turnstileSiteKey ? (
                  <div className="md:col-span-2">
                    <Script
                      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                      strategy="afterInteractive"
                    />
                    <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
                  </div>
                ) : (
                  <div className="md:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Falta configurar <code>TURNSTILE_SITE_KEY</code>.
                  </div>
                )}
                {errorMessage && (
                  <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
                  <p className="text-xs text-[#6C757D]">Tus datos solo se usarán para responder esta solicitud. No compartiremos tu información con terceros.</p>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="focus-ring tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSending ? 'Enviando...' : 'Enviar solicitud'}
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
