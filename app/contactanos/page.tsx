'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactanosPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <section className="mx-auto max-w-4xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Contacto
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-4">
            Contáctanos
          </h1>
          <p className="text-[#495057] text-base md:text-lg leading-relaxed max-w-3xl">
            Este formulario está pensado para sugerencias, comunicaciones, alianzas y colaboraciones.
          </p>
        </section>

        <section className="mx-auto max-w-4xl mt-10 bg-white rounded-2xl border border-[#E9ECEF] p-6 md:p-8">
          {sent ? (
            <div className="py-8 text-center" aria-live="polite">
              <h2 className="mb-2 text-2xl font-bold text-[#212529]">Recibimos tu mensaje</h2>
              <p className="mb-6 text-[#6C757D]">Gracias por escribirnos. Te responderemos por correo en 24-48 horas.</p>
              <Link href="/" className="focus-ring tap-target inline-flex rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#212529] mb-1.5">Nombre</label>
                <input id="name" required className="form-field" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#212529] mb-1.5">Correo</label>
                <input id="email" type="email" required className="form-field" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="topic" className="block text-sm font-medium text-[#212529] mb-1.5">Categoría</label>
                <select id="topic" className="form-field tap-target">
                  <option>Sugerencia</option>
                  <option>Comunicaciones</option>
                  <option>Alianzas</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-[#212529] mb-1.5">Mensaje</label>
                <textarea id="message" required rows={5} className="form-field min-h-36 resize-none" placeholder="Escribe aquí tu consulta o propuesta..." />
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
                <p className="text-xs text-[#6C757D]">Usaremos este correo solo para responder tu mensaje. Tiempo estimado de respuesta: 24-48 horas.</p>
                <button type="submit" className="focus-ring tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]">
                  Enviar mensaje
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
