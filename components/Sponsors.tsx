'use client'

import type { Sponsor } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useState } from 'react'

function TierHeader({
  label,
  tone,
}: {
  label: string
  tone: 'gold' | 'silver' | 'bronze' | 'partner'
}) {
  const tones = {
    gold: 'border-[#F89820]/35 bg-[#F89820]/10 text-[#9A4F00]',
    silver: 'border-[#6C757D]/25 bg-[#6C757D]/10 text-[#495057]',
    bronze: 'border-[#8B5A2B]/30 bg-[#8B5A2B]/10 text-[#6F451D]',
    partner: 'border-[#2F4F7A]/25 bg-[#2F4F7A]/10 text-[#22385A]',
  }

  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-[#DEE2E6]" />
      <p
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] ${tones[tone]}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
        {label}
      </p>
      <div className="h-px flex-1 bg-[#DEE2E6]" />
    </div>
  )
}

function SponsorLogo({ sponsor, size }: { sponsor: Sponsor; size: 'lg' | 'md' | 'sm' }) {
  const [imgError, setImgError] = useState(false)
  const sizeClasses = {
    lg: 'w-32 h-16 sm:w-40 sm:h-20',
    md: 'w-28 h-14 sm:w-32 sm:h-16',
    sm: 'w-24 h-12',
  }

  const showLogo = !!sponsor.logoUrl && !imgError

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`sponsor-logo focus-ring tap-target flex items-center justify-center ${sizeClasses[size]} rounded-lg border border-[#CED4DA] bg-[#F1F3F5] transition-all hover:border-[#F89820]`}
      aria-label={`Visitar sitio web de ${sponsor.name}`}
    >
      {showLogo ? (
        <img
          src={sponsor.logoUrl}
          alt={`Logo de ${sponsor.name}`}
          className="max-h-[75%] max-w-[80%] object-contain"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-mono text-xs sm:text-sm text-[#6C757D] text-center px-2">
          {sponsor.name}
        </span>
      )}
    </a>
  )
}

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  const sponsorCompanies = sponsors.filter((s) => (s.category ?? 'sponsor') === 'sponsor')
  const partnerCompanies = sponsors.filter((s) => (s.category ?? 'sponsor') === 'partner')
  const goldSponsors = sponsorCompanies.filter((s) => s.tier === 'gold')
  const silverSponsors = sponsorCompanies.filter((s) => s.tier === 'silver')
  const bronzeSponsors = sponsorCompanies.filter((s) => s.tier === 'bronze')
  const hasSponsors = sponsorCompanies.length > 0
  const hasPartners = partnerCompanies.length > 0
  const hasAnyCompanies = hasSponsors || hasPartners
  // Cabecera y mensaje: si solo hay partners, mostrar cabecera de sponsors
  let sectionLabel = 'Sponsors'
  let sectionTitle = 'Empresas que hacen posible la comunidad'
  let showPartnerBlockLabel = false
  let showNoSponsorsMessage = false
  let showPartnersHeaderBelow = false

  if (hasSponsors && hasPartners) {
    sectionLabel = 'Sponsors & Partners'
    sectionTitle = 'Empresas y aliados que hacen posible la comunidad'
    showPartnerBlockLabel = true
  } else if (hasPartners && !hasSponsors) {
    sectionLabel = 'Sponsors'
    sectionTitle = 'Empresas que hacen posible la comunidad'
    showPartnerBlockLabel = false
    showNoSponsorsMessage = true
    showPartnersHeaderBelow = true
  }
  const [headerRef, headerInView] = useInView()
  const [tiersRef, tiersInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            {sectionLabel}
          </p>
          <h2 id="sponsors-title" className="mx-auto mb-4 max-w-[18ch] text-3xl font-bold text-[#212529] md:max-w-none md:text-4xl">
            {sectionTitle}
          </h2>
        </div>

        {/* Sponsor tiers */}
        <div
          ref={tiersRef}
          className={`transition-all duration-1000 ease-out ${tiersInView ? 'opacity-100' : 'opacity-0'}`}
        >
          {(!hasAnyCompanies || showNoSponsorsMessage) && (
            <div className="mb-12 md:mb-16 rounded-2xl border border-dashed border-[#CED4DA] bg-[#F8F9FA] p-8 text-center">
              <p className="font-semibold text-[#212529] mb-2">Sponsors próximamente</p>
              <p className="text-sm text-[#6C757D] max-w-2xl mx-auto">
                Estamos abriendo nuevos espacios de colaboración. Muy pronto publicaremos aquí las marcas que acompañan a Panama JUG.
              </p>
            </div>
          )}

          {showPartnersHeaderBelow && (
            <div className="mb-12 md:mb-16 text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
                Partners
              </p>
              <h2 className="mx-auto mb-4 max-w-[18ch] text-3xl font-bold text-[#212529] md:max-w-none md:text-4xl">
                Aliados que hacen posible la comunidad
              </h2>
            </div>
          )}

          {goldSponsors.length > 0 && (
            <div className="mb-6 rounded-2xl border border-[#F89820]/20 bg-[#FFF8EF] p-5 sm:p-6">
              <TierHeader label="Gold" tone="gold" />
              <div className="flex flex-wrap justify-center gap-6">
                {goldSponsors.map((sponsor) => (
                  <SponsorLogo key={sponsor.id} sponsor={sponsor} size="lg" />
                ))}
              </div>
            </div>
          )}

          {silverSponsors.length > 0 && (
            <div className="mb-6 rounded-2xl border border-[#CED4DA] bg-[#F8F9FA] p-5 sm:p-6">
              <TierHeader label="Silver" tone="silver" />
              <div className="flex flex-wrap justify-center gap-4">
                {silverSponsors.map((sponsor) => (
                  <SponsorLogo key={sponsor.id} sponsor={sponsor} size="md" />
                ))}
              </div>
            </div>
          )}

          {bronzeSponsors.length > 0 && (
            <div className="mb-12 md:mb-16 rounded-2xl border border-[#E9D8C3] bg-[#FFF9F3] p-5 sm:p-6">
              <TierHeader label="Bronze" tone="bronze" />
              <div className="flex flex-wrap justify-center gap-3">
                {bronzeSponsors.map((sponsor) => (
                  <SponsorLogo key={sponsor.id} sponsor={sponsor} size="sm" />
                ))}
              </div>
            </div>
          )}

          {partnerCompanies.length > 0 && (
            <div className="mb-12 md:mb-16 rounded-2xl border border-[#2F4F7A]/20 bg-white p-8 sm:p-12 flex flex-col items-center">
              {showPartnerBlockLabel && (
                <div className="mb-4 flex items-center justify-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
                    Aliados
                  </p>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-8">
                {partnerCompanies.length === 1
                  ? <SponsorLogo key={partnerCompanies[0].id} sponsor={partnerCompanies[0]} size="lg" />
                  : partnerCompanies.map((sponsor) => (
                      <SponsorLogo key={sponsor.id} sponsor={sponsor} size="lg" />
                    ))}
              </div>
            </div>
          )}

        </div>{/* end tiers */}

        {/* CTA Card */}
        <div
          ref={ctaRef}
          className={`relative overflow-hidden rounded-2xl border border-[#2F4F7A]/20 bg-[radial-gradient(circle_at_top_right,_#3A5F91_0%,_#2F4F7A_45%,_#22385A_100%)] p-6 sm:p-8 md:p-10 transition-all duration-700 ease-out ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#F89820]/20 blur-2xl" />
          <div className="relative grid gap-6 md:grid-cols-[1.6fr_auto] md:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
                Programa de sponsors 2026
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                ¿Tu empresa quiere ser sponsor de Panama JUG?
              </h3>
              <p className="text-[#D7E1EE] text-sm md:text-base max-w-2xl">
                Conecta tu marca con la comunidad Java local a través de eventos técnicos, contenido y networking de alto valor.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a
                href="/conviertete-en-sponsor"
                aria-label="Ir a la página para convertirse en sponsor de Panama JUG"
                className="focus-ring tap-target inline-flex items-center justify-center gap-2 rounded-lg bg-[#F89820] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
              >
                Quiero ser sponsor
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-xs font-mono text-[#B8C6DA] text-center md:text-right">
                Respuesta en 24-48 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
