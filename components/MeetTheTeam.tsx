'use client'

import Link from 'next/link'
import { Github, Linkedin, Users } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function MeetTheTeam() {
  const [headerRef, headerInView] = useInView()
  const [cardRef, cardInView] = useInView()

  return (
    <section
      id="liderazgo"
      aria-labelledby="leadership-title"
      className="bg-[linear-gradient(145deg,#F8F9FA_0%,#EEF2F6_100%)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-10 text-center transition-all duration-700 ease-out ${headerInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <Users className="h-4 w-4 text-[#F89820]" />
            Liderazgo
          </p>
          <h2 id="leadership-title" className="text-3xl font-bold text-[#212529] md:text-4xl">
            Construyendo la comunidad paso a paso
          </h2>
        </div>

        <div
          ref={cardRef}
          className={`flex justify-center transition-all duration-700 ease-out ${cardInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <article className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-[#DEE2E6] bg-white p-7 text-center shadow-[0_18px_40px_-24px_rgba(34,56,90,0.45)] sm:p-8">
            <Link
              href="https://github.com/aguirre-jes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver el perfil de GitHub de Jesús Aguirre"
              className="focus-ring mb-4 rounded-full"
            >
              <img
                src="https://github.com/aguirre-jes.png"
                alt="Jesús Aguirre"
                width={104}
                height={104}
                className="h-26 w-26 rounded-full border-4 border-[#F89820] object-cover shadow-md transition-transform hover:scale-105"
              />
            </Link>

            <h3 className="text-xl font-bold text-[#22385A]">Jesús Aguirre</h3>
            <p className="mt-1 text-sm font-semibold text-[#495057]">JUG Leader</p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://github.com/aguirre-jes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Jesús Aguirre"
                className="focus-ring tap-target inline-flex items-center justify-center rounded-md text-[#212529] transition-colors hover:text-[#F89820]"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jesusaguirre-sa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Jesús Aguirre"
                className="focus-ring tap-target inline-flex items-center justify-center rounded-md text-[#0A66C2] transition-colors hover:text-[#F89820]"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
