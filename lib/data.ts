// JUG Panama — Shared Types and Navigation
// Events and sponsors content now comes from Markdown via lib/content.ts.

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventStatus = 'upcoming' | 'past' | 'cancelled'
export type EventType = 'virtual' | 'presencial' | 'hibrido'
export type SponsorTier = 'gold' | 'silver' | 'bronze'
export type SponsorCategory = 'sponsor' | 'partner'

export interface Event {
  id: string
  title: string
  description: string
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
  { href: '/#sponsors', label: 'Sponsors' },
]

export const footerLinks = {
  navigation: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#comunidad', label: 'Comunidad' },
    { href: '/#eventos', label: 'Eventos' },
    { href: '/#sponsors', label: 'Sponsors' },
  ],
  community: [
    { href: '/sobre-jug-panama', label: 'Sobre JUG Panama' },
    { href: '/conviertete-en-sponsor', label: 'Conviértete en sponsor' },
    { href: '/codigo-de-conducta', label: 'Código de conducta' },
    { href: '/contactanos', label: 'Contáctanos' },
  ],
}
