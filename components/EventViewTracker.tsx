'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { analyticsEvents } from '@/lib/analytics-events'

export default function EventViewTracker({
  eventId,
  eventType,
  eventStatus,
}: {
  eventId: string
  eventType: string
  eventStatus: string
}) {
  useEffect(() => {
    trackEvent(analyticsEvents.eventDetailView, {
      event_id: eventId,
      event_type: eventType,
      event_status: eventStatus,
    })
  }, [eventId, eventStatus, eventType])

  return null
}
