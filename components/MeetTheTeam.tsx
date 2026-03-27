"use client"
import Link from 'next/link'
import { Linkedin, Users, Github } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function MeetTheTeam() {
  const [headerRef, headerInView] = useInView()
  const [cardRef, cardInView] = useInView()
  return (
    <section
      id="equipo"
      aria-labelledby="team-title"
      className="py-16 md:py-24 bg-gradient-to-br from-[#F8F9FA] via-[#E9ECEF] to-[#F1F3F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 flex flex-col items-center transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <Users className="w-4 h-4 text-[#F89820]" />
            Conoce al equipo
          </span>
          <h2 id="team-title" className="text-3xl md:text-4xl font-bold text-[#212529] mb-4 text-center">
            Liderando la comunidad Java en Panamá
          </h2>
        </div>
        {/* Card */}
        <div
          ref={cardRef}
          className={`flex flex-col items-center justify-center transition-all duration-700 ease-out ${cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white rounded-2xl border border-[#DEE2E6] p-8 flex flex-col items-center w-full max-w-xs shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative mb-3">
              <Link href="https://github.com/aguirre-jes" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://github.com/aguirre-jes.png"
                  alt="Jesús Aguirre"
                  width={90}
                  height={90}
                  className="rounded-full border-4 border-[#F89820] shadow-md hover:scale-105 transition-transform"
                />
              </Link>
              <span className="absolute bottom-0 right-0 bg-[#F89820] rounded-full p-1 shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </span>
            </div>
            <h3 className="text-xl font-semibold text-[#22385A] mb-1">Jesús Aguirre</h3>
            <span className="text-sm text-[#495057] mb-2">JUG Líder</span>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="https://github.com/aguirre-jes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group"
              >
                <Github className="w-7 h-7 text-[#212529] group-hover:text-[#F89820] transition-colors" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/info-aguirre-jesus/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group"
              >
                <Linkedin className="w-7 h-7 text-[#0A66C2] group-hover:text-[#F89820] transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
