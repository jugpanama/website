'use client'

import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ConsentBanner from '@/components/ConsentBanner'
import {
  GA_MEASUREMENT_ID,
  getAnalyticsConsent,
  trackPageView,
  type AnalyticsConsent,
} from '@/lib/analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)
  const [consent, setConsent] = useState<AnalyticsConsent>(null)

  useEffect(() => {
    setConsent(getAnalyticsConsent())

    const handleConsentChange = (event: Event) => {
      setConsent((event as CustomEvent<AnalyticsConsent>).detail)
    }

    window.addEventListener('panamajug:analytics-consent', handleConsentChange)
    return () => window.removeEventListener('panamajug:analytics-consent', handleConsentChange)
  }, [])

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname
      return
    }

    if (consent === 'granted' && previousPathname.current !== pathname) {
      trackPageView(pathname, window.location.search)
    }

    previousPathname.current = pathname
  }, [consent, pathname])

  const enabled = consent === 'granted' && Boolean(GA_MEASUREMENT_ID)

  return (
    <>
      {children}
      {enabled && (
        <>
          <Analytics />
          <SpeedInsights />
          <Script
            id="ga4-consent"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; window.gtag = function(){window.dataLayer.push(arguments);}; window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });`,
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.gtag('js', new Date()); window.gtag('consent', 'update', { analytics_storage: 'granted' }); window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`,
            }}
          />
        </>
      )}
      <ConsentBanner />
    </>
  )
}
