'use client'

import { useEffect, useState } from 'react'
import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from '@/lib/analytics'

export default function ConsentBanner() {
  const [consent, setConsent] = useState<AnalyticsConsent>(null)

  useEffect(() => {
    setConsent(getAnalyticsConsent())

    const handleConsentChange = (event: Event) => {
      setConsent((event as CustomEvent<AnalyticsConsent>).detail)
    }

    window.addEventListener('panamajug:analytics-consent', handleConsentChange)
    return () => window.removeEventListener('panamajug:analytics-consent', handleConsentChange)
  }, [])

  if (consent !== null) {
    return (
      <button
        type="button"
        onClick={() => setConsent(null)}
        className="fixed bottom-4 left-4 z-[100] rounded border border-[#DCE3EC] bg-white px-3 py-2 text-xs font-semibold text-[#2F4F7A] shadow-md hover:bg-[#F1F3F5]"
      >
        Privacidad
      </button>
    )
  }

  return (
    <aside
      aria-label="Preferencias de analítica"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-xl border border-[#DCE3EC] bg-white p-5 shadow-[0_18px_45px_-18px_rgba(13,26,45,0.45)]"
    >
      <h2 className="text-base font-semibold text-[#212529]">Ayúdanos a mejorar</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#495057]">
        Usamos analítica para saber qué contenidos y actividades interesan más a la comunidad.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setAnalyticsConsent('denied')}
          className="focus-ring rounded px-4 py-2 text-sm font-semibold text-[#2F4F7A] hover:bg-[#F1F3F5]"
        >
          No, gracias
        </button>
        <button
          type="button"
          onClick={() => setAnalyticsConsent('granted')}
          className="focus-ring rounded bg-[#F89820] px-4 py-2 text-sm font-semibold text-white hover:bg-[#DD7A0A]"
        >
          Aceptar
        </button>
      </div>
    </aside>
  )
}
