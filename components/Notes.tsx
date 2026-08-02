'use client'

import { ArrowUpRight, BookOpen, CalendarDays, UserRound } from 'lucide-react'
import type { Note } from '@/lib/data'
import { useInView } from '@/hooks/use-in-view'

export default function Notes({ notes }: { notes: Note[] }) {
  const [headerRef, headerInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <section id="notas" aria-labelledby="notes-title" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-10 max-w-3xl transition-all duration-700 ease-out ${headerInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/20 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <BookOpen className="h-3.5 w-3.5 text-[#F89820]" />
            Panama JUG Notes
          </p>
          <h2 id="notes-title" className="text-3xl font-bold text-[#212529] md:text-4xl">
            Ideas técnicas desde la comunidad
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#495057]">
            Notas breves sobre Java, la JVM, Jakarta EE, Cloud Native y las tecnologías que usamos para construir software.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, index) => {
            const isAvailable = note.status === 'published' && note.references.length > 0

            return (
              <article
                key={note.id}
                className={`card-hover flex min-h-64 flex-col rounded-2xl border border-[#DCE3EC] bg-[linear-gradient(145deg,#FFFFFF_0%,#F5F8FC_100%)] p-6 transition-all duration-700 ease-out ${cardsInView ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}
                style={{ transitionDelay: cardsInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-md bg-[#22385A] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                    {note.category}
                  </span>
                  <span className="rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-2.5 py-1 text-xs font-semibold text-[#9A4F00]">
                    {note.status === 'coming-soon' ? 'Próximamente' : 'Publicada'}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#212529]">{note.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#495057]">{note.summary}</p>
                <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#6C757D]">
                  <UserRound className="h-3.5 w-3.5" />
                  {note.author}
                </p>

                <div className="mt-auto border-t border-[#DCE3EC] pt-4">
                  <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs text-[#6C757D]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {note.displayDate ?? note.date ?? 'Fecha de publicación por confirmar'}
                  </p>
                  {isAvailable ? (
                    <a
                      href={note.references[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-[#2F4F7A] hover:text-[#22385A]"
                    >
                      Consultar referencia <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="text-sm text-[#6C757D]">Compartiremos el enlace cuando la nota esté lista.</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
