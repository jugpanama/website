'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, CalendarDays, UserRound } from 'lucide-react'
import { formatNoteDate, type Note } from '@/lib/data'
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
            Panama JUG Notas
          </p>
          <h2 id="notes-title" className="text-3xl font-bold text-[#212529] md:text-4xl">
            Ideas técnicas desde la comunidad
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#495057]">
            Notas breves sobre Java, la JVM, Jakarta EE, Cloud Native y las tecnologías que usamos para construir software.
          </p>
          <Link
            href="/notas"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-[#2F4F7A] hover:text-[#22385A]"
          >
            Explorar todas las Notes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, index) => {
            return (
              <article
                key={note.slug}
                className={`card-hover flex min-h-64 flex-col overflow-hidden rounded-2xl border border-[#DCE3EC] bg-[linear-gradient(145deg,#FFFFFF_0%,#F5F8FC_100%)] transition-all duration-700 ease-out ${cardsInView ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}
                style={{ transitionDelay: cardsInView ? `${index * 100}ms` : '0ms' }}
              >
                <Link
                  href={`/notas/${note.slug}`}
                  aria-label={`Leer ${note.title}`}
                  className="focus-ring flex flex-1 flex-col rounded-2xl p-6"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="inline-flex rounded-md bg-[#22385A] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                      Panama JUG Notas
                    </span>
                    <span className="rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-2.5 py-1 text-xs font-semibold text-[#9A4F00]">
                      #{String(note.number).padStart(3, '0')}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#212529]">{note.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-[#495057]">{note.summary}</p>
                  <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#6C757D]">
                    <UserRound className="h-3.5 w-3.5 shrink-0" />
                    {note.author.name}
                  </p>

                  <div className="mt-auto flex flex-col gap-3 border-t border-[#DCE3EC] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="inline-flex min-w-0 items-center gap-2 font-mono text-xs text-[#6C757D]">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      {formatNoteDate(note.date)}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#2F4F7A]">
                    Leer Nota <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
