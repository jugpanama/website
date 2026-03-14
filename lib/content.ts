import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { Event, Sponsor } from '@/lib/data'

const eventSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  displayDate: z.string(),
  type: z.enum(['virtual', 'presencial', 'hibrido']),
  status: z.enum(['upcoming', 'past', 'cancelled']),
  speakerName: z.string(),
  speakerCompany: z.string(),
  time: z.string(),
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
  tier: z.enum(['gold', 'silver', 'bronze']),
  isActive: z.boolean().default(true),
  sortOrder: z.number(),
})

const EVENTS_UPCOMING_DIR = path.join(process.cwd(), 'content/events/actuales')
const EVENTS_PAST_DIR = path.join(process.cwd(), 'content/events/pasados')
const SPONSORS_DIR = path.join(process.cwd(), 'content/sponsors')

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
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getUpcomingEventsFromMarkdown(): Event[] {
  return listMarkdownFiles(EVENTS_UPCOMING_DIR)
    .map((filePath) => parseMarkdownFrontmatter(filePath, eventSchema))
    .filter((event): event is Event => event !== null)
    .filter((event) => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastEventsFromMarkdown(): Event[] {
  return listMarkdownFiles(EVENTS_PAST_DIR)
    .map((filePath) => parseMarkdownFrontmatter(filePath, eventSchema))
    .filter((event): event is Event => event !== null)
    .filter((event) => event.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
