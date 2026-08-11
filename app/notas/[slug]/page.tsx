import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutNoteAuthor from '@/components/AboutNoteAuthor'
import NoteContent from '@/components/NoteContent'
import { NoteThemeControls, NoteThemeProvider } from '@/components/NoteTheme'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { getNoteBySlug, getNotesFromMarkdown, getUpcomingEventsFromMarkdown } from '@/lib/content'
import { formatNoteDate } from '@/lib/data'

type NotePageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getNotesFromMarkdown().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return {}

  const url = `/notas/${note.slug}`
  const image = note.image ?? '/og.png'

  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'es_PA',
      url,
      siteName: 'Panama JUG',
      title: note.title,
      description: note.summary,
      publishedTime: note.date,
      authors: [note.author.name],
      tags: note.tags,
      images: [{ url: image, width: 1200, height: 630, alt: note.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.summary,
      images: [image],
    },
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) notFound()

  const nextEvent = getUpcomingEventsFromMarkdown()[0] ?? null
  const url = `https://panamajug.org/notas/${note.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    author: {
      '@type': 'Person',
      name: note.author.name,
      jobTitle: note.author.role,
      url: note.author.links[0]?.url,
    },
    publisher: { '@type': 'Organization', name: 'Panama JUG', url: 'https://panamajug.org' },
    mainEntityOfPage: url,
    image: note.image ? `https://panamajug.org${note.image}` : 'https://panamajug.org/og.png',
    keywords: note.tags.join(', '),
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
                  <Link href="/notas" className="note-back-link focus-ring">
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Todas las Notes
                  </Link>
                  <NoteThemeControls />
                </div>

                <p className="note-series-label">
                  Panama JUG Nota #{String(note.number).padStart(3, '0')}
                </p>
                <h1 className="note-title">{note.title}</h1>
                <p className="note-summary">{note.summary}</p>

                <div className="note-meta-line" aria-label="Datos de publicación">
                  <span>{note.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{note.readingTime} min de lectura</span>
                </div>

                {note.tags.length > 0 && (
                  <ul className="note-tags" aria-label="Temas de la Note">
                    {note.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                )}

                {note.takeaways.length > 0 && (
                  <aside className="note-takeaways" aria-labelledby="note-takeaways-title">
                    <h2 id="note-takeaways-title">Ideas Claves</h2>
                    <ul>
                      {note.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
                    </ul>
                  </aside>
                )}
              </div>
            </header>

            <div className="note-article-body mx-auto max-w-3xl px-4 py-10 md:py-14">
              <NoteContent content={note.content} figures={note.figures} />

              {note.youtube && (
                <section aria-labelledby="note-video-title" className="note-closing-section">
                  <h2 id="note-video-title" className="note-section-title">Contenido complementario</h2>
                  <YouTubeEmbed id={note.youtube.id} title={note.youtube.title} />
                </section>
              )}

              {note.references.length > 0 && (
                <section aria-labelledby="note-references-title" className="note-closing-section">
                  <h2 id="note-references-title" className="note-section-title">Referencias</h2>
                  <ul className="note-references">
                    {note.references.map((reference) => (
                      <li key={reference.url}>
                        <a href={reference.url} target="_blank" rel="noopener noreferrer" className="note-inline-link focus-ring">
                          {reference.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <AboutNoteAuthor author={note.author} />

              <Link href="/notas" className="note-bottom-back-link focus-ring">
                <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Todas las Notes
              </Link>
            </div>
          </article>
          <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
        </main>
      </NoteThemeProvider>
      <Footer nextEvent={nextEvent} />
    </div>
  )
}
