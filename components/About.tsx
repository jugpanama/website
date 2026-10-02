'use client'

import { BookOpen, CalendarClock, MessagesSquare, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

const featureIcons = [BookOpen, CalendarClock, MessagesSquare, Users]

export default function About() {
  const t = useTranslations('home')
  const [leftRef, leftInView] = useInView()
  const [gridRef, gridInView] = useInView()
  const features = t.raw('features') as Array<{ title: string; description: string }>
  const pills = t.raw('pillLabels') as string[]

  return (
    <section id="comunidad" aria-labelledby="about-title" className="bg-white py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ease-out ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <h2 id="about-title" className="mb-5 max-w-[16ch] text-3xl font-bold text-[#212529] text-balance md:text-4xl">
              {t('aboutTitle')}
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#495057] md:text-lg">
              {t('aboutText')}
            </p>
            <div className="flex flex-wrap gap-3">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full bg-[#2F4F7A] px-4 py-2 text-sm font-mono text-white shadow-[0_10px_24px_-16px_rgba(34,56,90,0.55)]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <Link
              href="/sobre-jug-panama"
              className="focus-ring mt-6 inline-flex items-center rounded-md font-medium text-[#2F4F7A] hover:text-[#22385A]"
            >
              {t('learnMore')} <span aria-hidden="true" className="ml-1">→</span>
            </Link>
            <Link
              href="/unete"
              className="focus-ring mt-6 ml-5 inline-flex items-center rounded-md font-medium text-[#2F4F7A] hover:text-[#22385A]"
            >
              {t('participate')} <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>

          {/* Right Column - Feature Cards */}
          <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = featureIcons[i] ?? Users
              return (
                <div
                  key={feature.title}
                  className={`card-hover rounded-2xl border border-[#DEE2E6] bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8F9FA_100%)] p-6 transition-all duration-700 ease-out ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: gridInView ? `${i * 90}ms` : '0ms' }}
                >
                  <Icon className="mb-4 h-8 w-8 text-[#F89820]" />
                  <h3 className="mb-2 font-semibold text-[#212529]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6C757D]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
