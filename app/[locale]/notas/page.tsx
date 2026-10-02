import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, BookOpen, CalendarDays, UserRound } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { NoteThemeControls, NoteThemeProvider } from '@/components/NoteTheme'
import { getNotesFromMarkdown, getUpcomingEventsFromMarkdown } from '@/lib/content'
import { formatNoteDate } from '@/lib/data'
import { getNotePath } from '@/lib/note-route'
import TrackedLink from '@/components/TrackedLink'
import { analyticsEvents } from '@/lib/analytics-events'
import { getTranslations } from 'next-intl/server'

type NotesPageProps = { params: Promise<{ locale: 'es' | 'en' }> }

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'notesPage' })
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `/${locale}/notas` },
  }
}

export default async function LocaleNotesPage({ params }: NotesPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'notesPage' })
  const notes = getNotesFromMarkdown(locale)
  const nextEvent = getUpcomingEventsFromMarkdown()[0] ?? null

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <NoteThemeProvider>
        <main id="main-content" tabIndex={-1} className="note-index-main">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="note-index-theme-row"><NoteThemeControls /></div>
            <p className="note-index-kicker"><BookOpen className="h-3.5 w-3.5" />{t('eyebrow')}</p>
            <h1 className="note-index-title">{t('title')}</h1>
            <p className="note-index-summary">{t('intro')}</p>

            {notes.length === 0 ? (
              <div className="note-empty-state">
                <h2>{t('emptyTitle')}</h2>
                <p>{t('emptyText')}</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => {
                  const noteHref = `/${locale}${getNotePath(note.slug)}`
                  return (
                    <article key={note.slug} className="note-index-card">
                      <TrackedLink
                        href={noteHref}
                        eventName={analyticsEvents.noteOpen}
                        eventParams={{ note_id: note.slug, note_tags: note.tags.join(',') }}
                        className="note-index-card-surface focus-ring"
                        aria-label={t('readLabel', { title: note.title })}
                      >
                        {note.image && <Image src={note.image} alt="" width={1200} height={630} priority={index === 0} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="note-index-card-image" />}
                        <div className="flex flex-1 flex-col p-6">
                          <p className="note-index-card-label">{t('noteLabel', { number: String(note.number).padStart(3, '0') })}</p>
                          <h2>{note.title}</h2>
                          <p className="note-index-card-summary">{note.summary}</p>
                          <div className="note-index-card-meta">
                            <p><CalendarDays className="h-3.5 w-3.5" />{formatNoteDate(note.date)}</p>
                            <p><UserRound className="h-3.5 w-3.5" />{note.author.name}</p>
                          </div>
                          {note.tags.length > 0 && <ul className="note-card-tags" aria-label={t('topics')}>{note.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
                          <span className="note-card-link" aria-hidden="true">{t('read')} <ArrowRight className="h-4 w-4" /></span>
                        </div>
                      </TrackedLink>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </NoteThemeProvider>
      <Footer nextEvent={nextEvent} />
    </div>
  )
}
