import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutNoteAuthor from '@/components/AboutNoteAuthor'
import NoteContent from '@/components/NoteContent'
import ShareNote from '@/components/ShareNote'
import { NoteThemeControls, NoteThemeProvider } from '@/components/NoteTheme'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import NoteEngagementTracker from '@/components/NoteEngagementTracker'
import { getNoteBySlug, getNotesFromMarkdown, getUpcomingEventsFromMarkdown } from '@/lib/content'
import { formatNoteDate } from '@/lib/data'
import { getTranslations } from 'next-intl/server'

type NotePageProps = { params: Promise<{ locale: 'es' | 'en'; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return (['es', 'en'] as const).flatMap((locale) => getNotesFromMarkdown(locale).map((note) => ({ locale, slug: note.slug })))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const note = getNoteBySlug(slug, locale)
  if (!note) return {}
  const t = await getTranslations({ locale, namespace: 'notesPage' })
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/${locale}/notas/${slug}` },
    openGraph: { type: 'article', locale: locale === 'en' ? 'en_US' : 'es_PA', url: `/${locale}/notas/${slug}`, siteName: 'Panama JUG', title: note.title, description: note.summary, publishedTime: note.date, authors: [note.author.name], tags: note.tags, images: [{ url: note.image ?? '/og.png', width: 1200, height: 630, alt: note.title }] },
    twitter: { card: 'summary_large_image', title: note.title, description: note.summary, images: [note.image ?? '/og.png'] },
    other: { 'article:section': t('title') },
  }
}

export default async function LocaleNotePage({ params }: NotePageProps) {
  const { locale, slug } = await params
  const note = getNoteBySlug(slug, locale)
  if (!note) notFound()
  const t = await getTranslations({ locale, namespace: 'notesPage' })
  const nextEvent = getUpcomingEventsFromMarkdown()[0] ?? null
  const url = `https://panamajug.org/${locale}/notas/${note.slug}`
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TechArticle', headline: note.title, description: note.summary, datePublished: note.date,
    author: { '@type': 'Person', name: note.author.name, jobTitle: note.author.role, url: note.author.links[0]?.url },
    publisher: { '@type': 'Organization', name: 'Panama JUG', url: 'https://panamajug.org' }, mainEntityOfPage: url, image: note.image ? `https://panamajug.org${note.image}` : 'https://panamajug.org/og.png', keywords: note.tags.join(', '),
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <NoteThemeProvider>
        <main id="main-content" tabIndex={-1} className="note-main">
          <article>
            <header className="note-article-header">
              <div className="mx-auto max-w-3xl">
                <div className="note-header-actions">
                  <Link href={`/${locale}/notas`} className="note-back-link focus-ring"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> {t('back')}</Link>
                  <NoteThemeControls />
                </div>
                <p className="note-series-label">{t('noteLabel', { number: String(note.number).padStart(3, '0') })}</p>
                <h1 className="note-title">{note.title}</h1>
                <p className="note-summary">{note.summary}</p>
                <div className="note-meta-line" aria-label={t('publishedData')}>
                  <span>{note.author.name}</span><span aria-hidden="true">·</span><time dateTime={note.date}>{formatNoteDate(note.date)}</time><span aria-hidden="true">·</span><span>{note.readingTime} {t('readingTime')}</span>
                </div>
                {note.tags.length > 0 && <ul className="note-tags" aria-label={t('topics')}>{note.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
                {note.takeaways.length > 0 && <aside className="note-takeaways" aria-labelledby="note-takeaways-title"><h2 id="note-takeaways-title">{t('takeaways')}</h2><ul>{note.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></aside>}
              </div>
            </header>
            <div className="note-article-body mx-auto max-w-3xl px-4 py-10 md:py-14">
              <NoteEngagementTracker noteId={note.slug} noteTags={note.tags} readingTime={note.readingTime} />
              <NoteContent content={note.content} figures={note.figures} />
              <ShareNote noteId={note.slug} title={note.title} url={url} />
              {note.youtube && <section aria-labelledby="note-video-title" className="note-closing-section"><h2 id="note-video-title" className="note-section-title">{t('supplementary')}</h2><YouTubeEmbed id={note.youtube.id} title={note.youtube.title} /></section>}
              {note.references.length > 0 && <section aria-labelledby="note-references-title" className="note-closing-section"><h2 id="note-references-title" className="note-section-title">{t('references')}</h2><ul className="note-references">{note.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="note-inline-link focus-ring">{reference.label}</a></li>)}</ul></section>}
              <AboutNoteAuthor author={note.author} />
              <nav aria-label={t('notesNavigation')} className="note-article-navigation"><Link href={`/${locale}/notas`} className="note-bottom-back-link focus-ring"><span className="note-bottom-back-icon" aria-hidden="true"><ArrowLeft className="h-5 w-5" /></span><span className="note-bottom-back-copy"><span className="note-bottom-back-title">{t('allNotes')}</span><span className="note-bottom-back-description">{t('allNotesDescription')}</span></span></Link></nav>
            </div>
          </article>
          <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
        </main>
      </NoteThemeProvider>
      <Footer nextEvent={nextEvent} />
    </div>
  )
}
