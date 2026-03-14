'use client'

import { Zap, GraduationCap, Globe, Users } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const features = [
  {
    icon: Zap,
    title: 'Charlas técnicas',
    description: 'Speakers locales e internacionales',
  },
  {
    icon: GraduationCap,
    title: 'Talleres',
    description: 'Formación práctica y hands-on',
  },
  {
    icon: Globe,
    title: 'Comunidad virtual',
    description: 'Eventos online accesibles',
  },
  {
    icon: Users,
    title: 'Networking',
    description: 'Conecta con la industria tech',
  },
]

const pills = ['☕ Java & JVM', '🌐 Cloud Native', '🤝 Open Source']

export default function About() {
  const [leftRef, leftInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section id="comunidad" aria-labelledby="about-title" className="bg-white py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ease-out ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <p className="mb-4 font-mono text-sm text-[#F89820]">
              {'// Quiénes somos'}
            </p>
            <h2 id="about-title" className="mb-5 max-w-[16ch] text-3xl font-bold text-[#212529] text-balance md:text-4xl">
              Una comunidad construida por y para desarrolladores
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#495057] md:text-lg">
              JUG Panama es un grupo de usuarios Java independiente, sin fines de lucro,
              dedicado a promover el ecosistema Java y JVM en Panamá. Organizamos eventos
              técnicos, charlas, talleres y conferencias para que los desarrolladores
              locales puedan aprender, conectar y crecer profesionalmente.
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
          </div>

          {/* Right Column - Feature Cards */}
          <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`card-hover rounded-2xl border border-[#DEE2E6] bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8F9FA_100%)] p-6 transition-all duration-700 ease-out ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: gridInView ? `${i * 90}ms` : '0ms' }}
              >
                <feature.icon className="mb-4 h-8 w-8 text-[#F89820]" />
                <h3 className="mb-2 font-semibold text-[#212529]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#6C757D]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
