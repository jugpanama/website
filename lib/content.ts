import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { Event, Note, Sponsor } from '@/lib/data'

const eventSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  published: z.boolean().optional().default(true),
  title: z.string(),
  description: z.string(),
  summary: z.string().optional(),
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

const noteSchema = z.object({
  number: z.number().int().positive(),
  published: z.boolean().optional().default(false),
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use an ISO date (YYYY-MM-DD)').optional(),
  summary: z.string(),
  author: z.object({
    name: z.string().min(1),
    role: z.string().min(1).optional(),
    bio: z.string().min(1).optional(),
    avatar: z.string().url().optional(),
    links: z.array(z.object({
      label: z.string().min(1),
      url: z.string().url(),
    })).optional().default([]),
  }),
  readingTime: z.number().int().positive().optional(),
  tags: z.array(z.string().min(1)).max(4).optional().default([]),
  takeaways: z.array(z.string().min(1)).max(3).optional().default([]),
  figures: z.array(z.object({
    caption: z.string().min(1).optional(),
    attribution: z.string().min(1).optional(),
    attributionUrl: z.string().url().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })).optional().default([]),
  image: z.string().startsWith('/notas/').optional(),
  youtube: z.object({
    id: z.string().regex(/^[A-Za-z0-9_-]{11}$/, 'Invalid YouTube video ID'),
    title: z.string().min(1),
  }).optional(),
  references: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
  })).optional().default([]),
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
const NOTES_DIR = path.join(process.cwd(), 'content/notes')

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

function parseNoteMarkdown(filePath: string): Note | null {
  try {
    const source = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(source)
    const result = noteSchema.safeParse(parsed.data)

    if (!result.success) {
      console.warn(
        `[content] Invalid note frontmatter in ${path.basename(filePath)}: ${result.error.issues
          .map((issue) => `${issue.path.join('.')} => ${issue.message}`)
          .join('; ')}`
      )
      return null
    }

    return {
      ...result.data,
      slug: path.basename(filePath, '.md'),
      content: parsed.content.trim(),
      readingTime:
        result.data.readingTime ?? estimateNoteReadingTime(parsed.content),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown parsing error'
    console.warn(`[content] Failed to parse note ${path.basename(filePath)}: ${message}`)
    return null
  }
}

function estimateNoteReadingTime(content: string): number {
  const readableText = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[[^\]]+\]\([^\)]+\)/g, ' ')
    .replace(/[#>*_~-]/g, ' ')
  const words = readableText.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 140))
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

export function getNotesFromMarkdown(): Note[] {
  return listMarkdownFiles(NOTES_DIR)
    .map((filePath) => parseNoteMarkdown(filePath))
    .filter((note): note is Note => note !== null)
    .filter((note) => note.published !== false)
    .sort((a, b) => {
      const aTs = getEventTimestamp(a.date)
      const bTs = getEventTimestamp(b.date)
      if (aTs === null && bTs === null) return a.title.localeCompare(b.title, 'es')
      if (aTs === null) return 1
      if (bTs === null) return -1
      return bTs - aTs
    })
}

export function getNoteBySlug(slug: string): Note | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null

  const note = parseNoteMarkdown(path.join(NOTES_DIR, `${slug}.md`))
  return note?.published ? note : null
}
