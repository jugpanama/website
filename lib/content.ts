import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { Event, Sponsor } from '@/lib/data'

const eventSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  published: z.boolean().optional().default(true),
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  displayDate: z.string().optional(),
  type: z.enum(['virtual', 'presencial', 'hibrido']),
  status: z.enum(['upcoming', 'past', 'cancelled']),
  speakerName: z.string(),
  speakerCompany: z.string(),
  time: z.string().optional(),
  location: z.string(),
  tags: z.array(z.string()),
  registrationOpen: z.boolean().optional().default(false),
  streamOpen: z.boolean().optional().default(false),
  lumaEventId: z.string().optional(),
  lumaEmbedUrl: z.string().optional(),
  youtubeLiveUrl: z.string().optional(),
  youtubeEmbedUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
})

const sponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  websiteUrl: z.string(),
  logoUrl: z.string().default(''),
  category: z.enum(['sponsor', 'partner']).optional().default('sponsor'),
  tier: z.enum(['gold', 'silver', 'bronze']).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number(),
}).refine(
  (data) => {
    // Si es sponsor, debe tener tier
    if ((data.category ?? 'sponsor') === 'sponsor') {
      return !!data.tier
    }
    // Si es partner, no debe tener tier
    return true
  },
  {
    message: 'Los sponsors deben tener tier definido (gold, silver, bronze)',
    path: ['tier'],
  }
)

const EVENTS_UPCOMING_DIR = path.join(process.cwd(), 'content/events/actuales')
const EVENTS_PAST_DIR = path.join(process.cwd(), 'content/events/pasados')
const SPONSORS_DIR = path.join(process.cwd(), 'content/sponsors')

function getEventTimestamp(dateValue?: string): number | null {
  if (!dateValue) return null
  const value = Date.parse(dateValue)
  return Number.isNaN(value) ? null : value
}

function sortByDateAscWithUnknownLast(a: Event, b: Event): number {
  const aTs = getEventTimestamp(a.date)
  const bTs = getEventTimestamp(b.date)
  if (aTs === null && bTs === null) return 0
  if (aTs === null) return 1
  if (bTs === null) return -1
  return aTs - bTs
}

function sortByDateDescWithUnknownLast(a: Event, b: Event): number {
  const aTs = getEventTimestamp(a.date)
  const bTs = getEventTimestamp(b.date)
  if (aTs === null && bTs === null) return 0
  if (aTs === null) return 1
  if (bTs === null) return -1
  return bTs - aTs
}

function parseMarkdownFrontmatter<T>(filePath: string, schema: z.ZodSchema<T>): T | null {
  try {
    const source = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(source)
    const result = schema.safeParse(parsed.data)

    if (!result.success) {
      console.warn(
        `[content] Invalid frontmatter in ${path.basename(filePath)}: ${result.error.issues
          .map((issue) => `${issue.path.join('.')} => ${issue.message}`)
          .join('; ')}`
      )
      return null
    }

    return result.data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown parsing error'
    console.warn(`[content] Failed to parse ${path.basename(filePath)}: ${message}`)
    return null
  }
}

function listMarkdownFiles(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) return []

  return fs
    .readdirSync(folderPath)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(folderPath, name))
}

export function getAllEventsFromMarkdown(): Event[] {
  const files = [
    ...listMarkdownFiles(EVENTS_UPCOMING_DIR),
    ...listMarkdownFiles(EVENTS_PAST_DIR),
  ]

  return files
    .map((filePath) => parseMarkdownFrontmatter(filePath, eventSchema))
    .filter((event): event is Event => event !== null)
    .filter((event) => event.published !== false)
    .sort(sortByDateAscWithUnknownLast)
}

export function getUpcomingEventsFromMarkdown(): Event[] {
  return listMarkdownFiles(EVENTS_UPCOMING_DIR)
    .map((filePath) => parseMarkdownFrontmatter(filePath, eventSchema))
    .filter((event): event is Event => event !== null)
    .filter((event) => event.published !== false)
    .filter((event) => event.status === 'upcoming')
    .sort(sortByDateAscWithUnknownLast)
}

export function getPastEventsFromMarkdown(): Event[] {
  return listMarkdownFiles(EVENTS_PAST_DIR)
    .map((filePath) => parseMarkdownFrontmatter(filePath, eventSchema))
    .filter((event): event is Event => event !== null)
    .filter((event) => event.published !== false)
    .filter((event) => event.status === 'past')
    .sort(sortByDateDescWithUnknownLast)
}

export function getNextEventWithEmbedFromMarkdown(): Event | null {
  return (
    getUpcomingEventsFromMarkdown().find(
      (event) =>
        (event.registrationOpen && !!event.lumaEmbedUrl) ||
        (event.streamOpen && !!event.youtubeEmbedUrl)
    ) ?? null
  )
}

export function getSponsorsFromMarkdown(): Sponsor[] {
  const files = listMarkdownFiles(SPONSORS_DIR)

  return files
    .map((filePath) => parseMarkdownFrontmatter(filePath, sponsorSchema))
    .filter((sponsor): sponsor is Sponsor => sponsor !== null)
    .map((sponsor) => ({
      ...sponsor,
      logoUrl: sponsor.logoUrl ?? '',
      category: sponsor.category ?? 'sponsor',
      isActive: sponsor.isActive ?? true,
    }))
    .filter((sponsor) => sponsor.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
