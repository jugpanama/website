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

export type NoteStatus = 'coming-soon' | 'published'

export interface Note {
  id: string
  title: string
  description: string
  publicationDate?: string
  displayDate?: string
  status: NoteStatus
  externalUrl?: string
  published?: boolean
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
  { href: '/#notas', label: 'Notas' },
  { href: '/contactanos', label: 'Participa' },
]

export const footerLinks = {
  navigation: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#comunidad', label: 'Comunidad' },
    { href: '/#eventos', label: 'Eventos' },
    { href: '/#notas', label: 'Panama JUG Notes' },
  ],
  community: [
    { href: '/sobre-jug-panama', label: 'Sobre Panama JUG' },
    { href: '/contactanos', label: 'Participa en la comunidad' },
    { href: '/conviertete-en-sponsor', label: 'Colaboración institucional' },
    { href: '/codigo-de-conducta', label: 'Código de conducta' },
    { href: '/contactanos', label: 'Contáctanos' },
  ],
}
