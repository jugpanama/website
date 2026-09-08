'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { analyticsEvents } from '@/lib/analytics-events'

export default function NoteEngagementTracker({
  noteId,
  noteTags,
  readingTime,
}: {
  noteId: string
  noteTags: string[]
  readingTime: number
}) {
  useEffect(() => {
    trackEvent(analyticsEvents.noteOpen, {
      note_id: noteId,
      note_tags: noteTags.join(','),
    })

    const thresholds = new Set<number>()

    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1

      for (const threshold of [50, 75]) {
        if (progress >= threshold / 100 && !thresholds.has(threshold)) {
          thresholds.add(threshold)
          trackEvent(analyticsEvents.noteEngagement, {
            note_id: noteId,
            threshold: `${threshold}%`,
            reading_time: readingTime,
          })
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [noteId, noteTags, readingTime])

  return null
}
