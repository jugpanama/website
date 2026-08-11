import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, CalendarDays, UserRound } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { NoteThemeControls, NoteThemeProvider } from '@/components/NoteTheme'
import { getNotesFromMarkdown, getUpcomingEventsFromMarkdown } from '@/lib/content'
import { formatNoteDate } from '@/lib/data'
import { getNotePath } from '@/lib/note-route'

export const metadata: Metadata = {
  title: 'Panama JUG Notas',
  description: 'Publicaciones técnicas de Panama JUG sobre Java, la JVM, Jakarta EE, Cloud Native y Open Source.',
  alternates: { canonical: '/notas' },
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    url: '/notas',
    siteName: 'Panama JUG',
    title: 'Panama JUG Notas',
    description: 'Publicaciones técnicas de la comunidad Java de Panamá.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Panama JUG Notas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panama JUG Notas',
    description: 'Publicaciones técnicas de la comunidad Java de Panamá.',
    images: ['/og.png'],
  },
}

export default function NotesPage() {
  const notes = getNotesFromMarkdown()
  const nextEvent = getUpcomingEventsFromMarkdown()[0] ?? null

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <NoteThemeProvider>
        <main id="main-content" tabIndex={-1} className="note-index-main">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="note-index-theme-row"><NoteThemeControls /></div>
            <p className="note-index-kicker">
              <BookOpen className="h-3.5 w-3.5" />
              Biblioteca técnica
            </p>
            <h1 className="note-index-title">Panama JUG Notas</h1>
            <p className="note-index-summary">
              Ideas, aprendizajes y contexto sobre Java y las tecnologías que usamos para construir software.
            </p>

            {notes.length === 0 ? (
              <div className="note-empty-state">
                <h2>La primera Note está en preparación</h2>
                <p>Las publicaciones aparecerán aquí cuando estén listas.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => (
                  <article key={note.slug} className="note-index-card">
                    <Link
                      href={getNotePath(note.slug)}
                      className="note-index-card-surface focus-ring"
                      aria-label={`Leer ${note.title}`}
                    >
                      {note.image && (
                        <Image
                          src={note.image}
                          alt=""
                          width={1200}
                          height={630}
                          priority={index === 0}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="note-index-card-image"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="note-index-card-label">
                          Panama JUG Nota #{String(note.number).padStart(3, '0')}
                        </p>
                        <h2>{note.title}</h2>
                        <p className="note-index-card-summary">{note.summary}</p>
                        <div className="note-index-card-meta">
                          <p><CalendarDays className="h-3.5 w-3.5" />{formatNoteDate(note.date)}</p>
                          <p><UserRound className="h-3.5 w-3.5" />{note.author.name}</p>
                        </div>
                        {note.tags.length > 0 && (
                          <ul className="note-card-tags" aria-label="Temas">
                            {note.tags.map((tag) => <li key={tag}>{tag}</li>)}
                          </ul>
                        )}
                        <span className="note-card-link" aria-hidden="true">
                          Leer Nota <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </NoteThemeProvider>
      <Footer nextEvent={nextEvent} />
    </div>
  )
}
