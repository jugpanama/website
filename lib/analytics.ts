import type { AnalyticsEventName, AnalyticsEventParams } from '@/lib/analytics-events'

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i.test(configuredMeasurementId)
  ? configuredMeasurementId
  : ''
export const ANALYTICS_CONSENT_KEY = 'panamajug_analytics_consent'

export type AnalyticsConsent = 'granted' | 'denied' | null

declare global {
  interface Window {
    dataLayer: Array<unknown[]>
    gtag?: (...args: unknown[]) => void
  }
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return null

  const consent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)
  return consent === 'granted' || consent === 'denied' ? consent : null
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent)
  window.dispatchEvent(new CustomEvent('panamajug:analytics-consent', { detail: consent }))
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (typeof window === 'undefined' || !window.gtag || getAnalyticsConsent() !== 'granted') return

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  )

  window.gtag('event', name, cleanParams)
}

export function trackPageView(pathname: string, search = '') {
  if (typeof window === 'undefined' || !window.gtag || getAnalyticsConsent() !== 'granted') return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: `${pathname}${search}`,
  })
}
