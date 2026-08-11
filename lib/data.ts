// Panama JUG — Shared Types and Navigation
// Events, notes and sponsors content comes from Markdown via lib/content.ts.

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventStatus = 'upcoming' | 'past' | 'cancelled'
export type EventType = 'virtual' | 'presencial' | 'hibrido'
export type SponsorTier = 'gold' | 'silver' | 'bronze'
export type SponsorCategory = 'sponsor' | 'partner'

export interface Event {
  id: string
  title: string
  description: string
  summary?: string
  date?: string
  displayDate?: string
  type: EventType
  status: EventStatus
  speakerName: string
  speakerCompany: string
  time?: string
  location: string
  tags: string[]
  registrationOpen?: boolean
  streamOpen?: boolean
  lumaEventId?: string
  lumaEmbedUrl?: string
  youtubeLiveUrl?: string
  youtubeEmbedUrl?: string
  youtubeUrl?: string
  thumbnailUrl?: string
  published?: boolean
}

export interface NoteReference {
  label: string
  url: string
}

export interface NoteYouTube {
  id: string
  title: string
}

export interface NoteAuthorLink {
  label: string
  url: string
}

export interface NoteAuthor {
  name: string
  role?: string
  bio?: string
  avatar?: string
  links: NoteAuthorLink[]
}

export interface NoteFigure {
  caption?: string
  attribution?: string
  attributionUrl?: string
  width?: number
  height?: number
}

export interface Note {
  slug: string
  number: number
  title: string
  date?: string
  summary: string
  author: NoteAuthor
  content: string
  readingTime: number
  tags: string[]
  takeaways: string[]
  figures: NoteFigure[]
  references: NoteReference[]
  published: boolean
  image?: string
  youtube?: NoteYouTube
}

export function formatNoteDate(date?: string): string {
  if (!date) return 'Fecha por confirmar'

  return new Intl.DateTimeFormat('es-PA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

export interface Sponsor {
  id: string
  name: string
  websiteUrl: string
  logoUrl: string
  category?: SponsorCategory
  tier: SponsorTier
  isActive: boolean
  sortOrder: number
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#comunidad', label: 'Comunidad' },
  { href: '/#eventos', label: 'Eventos' },
  { href: '/notas', label: 'Notas' },
  { href: '/unete', label: 'Participa' },
]

export const footerLinks = {
  navigation: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#comunidad', label: 'Comunidad' },
    { href: '/#eventos', label: 'Eventos' },
    { href: '/notas', label: 'Panama JUG Notas' },
  ],
  community: [
    { href: '/sobre-jug-panama', label: 'Sobre Panama JUG' },
    { href: '/unete', label: 'Participa en la comunidad' },
    { href: '/conviertete-en-sponsor', label: 'Colaboración institucional' },
    { href: '/codigo-de-conducta', label: 'Código de conducta' },
    { href: '/contactanos', label: 'Contáctanos' },
  ],
}
