'use client'

import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTranslations } from 'next-intl'
import { Target, Presentation, Handshake } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function LocaleSobreJugPanamaPage() {
  const t = useTranslations('aboutPage')
  const [highlightsRef, highlightsInView] = useInView()

  const aboutHighlights = [
    {
      icon: Target,
      title: t.raw('highlights')[0]?.title ?? 'Mission',
      description: t.raw('highlights')[0]?.description ?? '',
    },
    {
      icon: Presentation,
      title: t.raw('highlights')[1]?.title ?? 'What we do',
      description: t.raw('highlights')[1]?.description ?? '',
    },
    {
      icon: Handshake,
      title: t.raw('highlights')[2]?.title ?? 'How to participate',
      description: t.raw('highlights')[2]?.description ?? '',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24 pb-16 md:pb-20 px-4">
        <section className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            {t('eyebrow')}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] mb-4">
            {t('title')}
          </h1>
          <p className="text-[#495057] text-base md:text-lg leading-relaxed max-w-3xl">
            {t('intro')}
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
            <h2 className="text-xl md:text-2xl font-bold text-[#212529]">{t('galleryTitle')}</h2>
            <span className="text-xs font-mono text-[#6C757D]">{t('gallerySoon')}</span>
          </div>

          <div className="rounded-xl border border-dashed border-[#B8C6DA] bg-white/70 px-6 py-10 text-center">
            <p className="text-sm text-[#6C757D]">{t('galleryEmpty')}</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl mt-12 text-center">
          <Link
            href="/eventos/proximos"
            className="inline-flex items-center justify-center rounded bg-[#F89820] px-6 py-3 text-sm font-semibold text-white hover:bg-[#DD7A0A] transition-colors"
          >
            {t('cta')}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
