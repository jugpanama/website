export const analyticsEvents = {
  ctaClick: 'cta_click',
  navigationClick: 'navigation_click',
  outboundClick: 'outbound_click',
  noteOpen: 'note_open',
  noteEngagement: 'note_engagement',
  noteShare: 'note_share',
  referenceClick: 'reference_click',
  eventDetailView: 'event_detail_view',
  eventRegistrationClick: 'event_registration_click',
  eventStreamClick: 'event_stream_click',
  speakerProposalClick: 'speaker_proposal_click',
  communityContributionClick: 'community_contribution_click',
  formStart: 'form_start',
  formSubmit: 'form_submit',
  formError: 'form_error',
  generateLead: 'generate_lead',
} as const

export type AnalyticsEventName = typeof analyticsEvents[keyof typeof analyticsEvents]

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>
