const NOTE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isValidNoteSlug(slug: string): boolean {
  return NOTE_SLUG_PATTERN.test(slug)
}

export function getNotePath(slug: string): string {
  if (!isValidNoteSlug(slug)) {
    throw new Error(`Invalid note slug: ${slug}`)
  }

  return `/notas/${encodeURIComponent(slug)}`
}
