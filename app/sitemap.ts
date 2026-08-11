import type { MetadataRoute } from 'next'
import { getNotesFromMarkdown } from '@/lib/content'
import { getNotePath } from '@/lib/note-route'

const BASE_URL = 'https://panamajug.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/notas',
    '/eventos/proximos',
    '/eventos/pasados',
    '/sobre-jug-panama',
    '/unete',
    '/contactanos',
    '/conviertete-en-sponsor',
    '/codigo-de-conducta',
  ].map((route) => ({ url: `${BASE_URL}${route}`, changeFrequency: 'monthly' as const }))

  const notes = getNotesFromMarkdown().map((note) => ({
    url: `${BASE_URL}${getNotePath(note.slug)}`,
    lastModified: note.date ? new Date(`${note.date}T00:00:00Z`) : undefined,
    changeFrequency: 'yearly' as const,
  }))

  return [...staticRoutes, ...notes]
}
