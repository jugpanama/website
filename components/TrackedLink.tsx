'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { trackEvent } from '@/lib/analytics'
import type { AnalyticsEventName, AnalyticsEventParams } from '@/lib/analytics-events'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName?: AnalyticsEventName
  eventParams?: AnalyticsEventParams
}

export default function TrackedLink({ eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (!event.defaultPrevented && eventName) {
      trackEvent(eventName, eventParams)
    }
  }

  return <a {...props} onClick={handleClick} />
}
