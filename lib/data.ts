// JUG Panama — Mock Data
// All data is hardcoded for UI/UX validation.
// In production these will be replaced by Supabase queries.

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventStatus = 'upcoming' | 'past' | 'cancelled'
export type EventType = 'virtual' | 'presencial' | 'hibrido'
export type SponsorTier = 'gold' | 'silver' | 'bronze'
export type SponsorCategory = 'sponsor' | 'partner'

export interface Event {
  id: string
  title: string
  description: string
  date: string           // ISO string
  displayDate: string    // e.g. "MAR 28, 2026"
  type: EventType
  status: EventStatus
  speakerName: string
  speakerCompany: string
  time: string
  location: string
  tags: string[]
  registrationOpen?: boolean // controls whether registration actions are shown
  streamOpen?: boolean // controls whether YouTube live actions are shown
  lumaEventId?: string   // e.g. evt-JMflFSoDIHu4QhA
  lumaEmbedUrl?: string  // https://lu.ma/embed/event/{id}/simple
  youtubeLiveUrl?: string
  youtubeEmbedUrl?: string
  youtubeUrl?: string    // post-event recording
  thumbnailUrl?: string
}

export interface Sponsor {
  id: string
  name: string
  websiteUrl: string
  logoUrl: string
  category?: SponsorCategory
  tier: SponsorTier
  isActive: boolean
  sortOrder: number
}

// ─── Upcoming Events ──────────────────────────────────────────────────────────

export const upcomingEvents: Event[] = [
  {
    id: 'evt-001',
    title: 'Jakarta EE 11: Novedades y migración',
    description: 'Exploramos las nuevas características de Jakarta EE 11 y cómo migrar aplicaciones desde versiones anteriores. Sesión práctica con ejemplos reales.',
    date: '2026-03-28T19:00:00Z',
    displayDate: 'MAR 28, 2026',
    type: 'virtual',
    status: 'upcoming',
    speakerName: 'Carlos Mendoza',
    speakerCompany: 'Red Hat',
    time: '7:00 PM EST',
    location: 'Virtual / Zoom',
    tags: ['Jakarta EE', 'Java', 'Enterprise'],
    lumaEventId: 'evt-xtxkHUCQJTptNUM',
    lumaEmbedUrl: 'https://luma.com/embed/event/evt-xtxkHUCQJTptNUM/simple',
  },
  {
    id: 'evt-002',
    title: 'Spring Boot 3.4: Arquitectura moderna',
    description: 'Todo sobre las novedades de Spring Boot 3.4 y las mejores prácticas de arquitectura para aplicaciones en producción con Java 21.',
    date: '2026-04-15T18:30:00Z',
    displayDate: 'ABR 15, 2026',
    type: 'presencial',
    status: 'upcoming',
    speakerName: 'María González',
    speakerCompany: 'Broadcom',
    time: '6:30 PM EST',
    location: 'Ciudad de Panamá — Casco Viejo',
    tags: ['Spring Boot', 'Architecture', 'Java 21'],
    lumaEventId: 'evt-springboot-2026',
    lumaEmbedUrl: 'https://lu.ma/embed/event/evt-springboot-2026/simple',
  },
  {
    id: 'evt-003',
    title: 'Quarkus y GraalVM: de 0 a producción',
    description: 'Taller práctico: construye y despliega una aplicación Quarkus nativa con GraalVM. Aprende a reducir tiempo de arranque y consumo de memoria.',
    date: '2026-05-10T19:00:00Z',
    displayDate: 'MAY 10, 2026',
    type: 'hibrido',
    status: 'upcoming',
    speakerName: 'Roberto Díaz',
    speakerCompany: 'Oracle',
    time: '7:00 PM EST',
    location: 'Tech Hub Panama + Virtual',
    tags: ['Quarkus', 'GraalVM', 'Cloud Native'],
    lumaEventId: 'evt-quarkus-2026',
    lumaEmbedUrl: 'https://lu.ma/embed/event/evt-quarkus-2026/simple',
  },
]

// ─── Past Events ──────────────────────────────────────────────────────────────

export const pastEvents: Event[] = [
  {
    id: 'past-001',
    title: 'Microservicios con Spring Cloud',
    description: 'Aprende a construir arquitecturas de microservicios escalables con Spring Cloud y Kubernetes.',
    date: '2026-02-20T19:00:00Z',
    displayDate: 'FEB 20, 2026',
    type: 'virtual',
    status: 'past',
    speakerName: 'Ana Torres',
    speakerCompany: 'Pivotal',
    time: '7:00 PM EST',
    location: 'Virtual',
    tags: ['Spring Boot', 'Microservices', 'Kubernetes'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
  {
    id: 'past-002',
    title: 'Java 21: Virtual Threads en acción',
    description: 'Exploramos las nuevas características de Java 21, enfocándonos en Virtual Threads y Project Loom.',
    date: '2026-01-15T19:00:00Z',
    displayDate: 'ENE 15, 2026',
    type: 'virtual',
    status: 'past',
    speakerName: 'Luis Pérez',
    speakerCompany: 'Oracle',
    time: '7:00 PM EST',
    location: 'Virtual',
    tags: ['Java 21', 'Virtual Threads', 'Concurrency'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
  {
    id: 'past-003',
    title: 'API REST con Quarkus',
    description: 'Desarrollo de APIs REST de alto rendimiento usando Quarkus y su integración con bases de datos.',
    date: '2025-12-10T19:00:00Z',
    displayDate: 'DIC 10, 2025',
    type: 'presencial',
    status: 'past',
    speakerName: 'Roberto Díaz',
    speakerCompany: 'Red Hat',
    time: '6:30 PM EST',
    location: 'Casco Viejo, Panamá',
    tags: ['Quarkus', 'REST API', 'Panache'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
  {
    id: 'past-004',
    title: 'Introducción a Jakarta EE 10',
    description: 'Una introducción completa a Jakarta EE 10 y su ecosistema para desarrollo empresarial.',
    date: '2025-11-25T19:00:00Z',
    displayDate: 'NOV 25, 2025',
    type: 'virtual',
    status: 'past',
    speakerName: 'Carlos Mendoza',
    speakerCompany: 'IBM',
    time: '7:00 PM EST',
    location: 'Virtual',
    tags: ['Jakarta EE', 'Enterprise', 'CDI'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
  {
    id: 'past-005',
    title: 'Testing en Java con JUnit 5',
    description: 'Mejores prácticas de testing unitario e integración usando JUnit 5 y Mockito.',
    date: '2025-10-18T19:00:00Z',
    displayDate: 'OCT 18, 2025',
    type: 'virtual',
    status: 'past',
    speakerName: 'María González',
    speakerCompany: 'JetBrains',
    time: '7:00 PM EST',
    location: 'Virtual',
    tags: ['JUnit 5', 'Testing', 'Mockito'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
  {
    id: 'past-006',
    title: 'Reactive Programming con Project Reactor',
    description: 'Fundamentos de programación reactiva usando Project Reactor y WebFlux.',
    date: '2025-09-22T19:00:00Z',
    displayDate: 'SEP 22, 2025',
    type: 'virtual',
    status: 'past',
    speakerName: 'Ana Torres',
    speakerCompany: 'Broadcom',
    time: '7:00 PM EST',
    location: 'Virtual',
    tags: ['Reactive', 'WebFlux', 'Project Reactor'],
    youtubeUrl: 'https://youtube.com/@jugpanama',
  },
]

// ─── Sponsors ─────────────────────────────────────────────────────────────────

export const sponsors: Sponsor[] = [
  { id: 'sp-1', name: 'Oracle', tier: 'gold', websiteUrl: 'https://oracle.com', logoUrl: '', isActive: true, sortOrder: 1 },
  { id: 'sp-2', name: 'Red Hat', tier: 'gold', websiteUrl: 'https://redhat.com', logoUrl: '', isActive: true, sortOrder: 2 },
  { id: 'sp-3', name: 'IBM', tier: 'gold', websiteUrl: 'https://ibm.com', logoUrl: '', isActive: true, sortOrder: 3 },
  { id: 'sp-4', name: 'Azul Systems', tier: 'silver', websiteUrl: 'https://azul.com', logoUrl: '', isActive: true, sortOrder: 1 },
  { id: 'sp-5', name: 'Payara', tier: 'silver', websiteUrl: 'https://payara.fish', logoUrl: '', isActive: true, sortOrder: 2 },
  { id: 'sp-6', name: 'Broadcom', tier: 'silver', websiteUrl: 'https://broadcom.com', logoUrl: '', isActive: true, sortOrder: 3 },
  { id: 'sp-7', name: 'JetBrains', tier: 'silver', websiteUrl: 'https://jetbrains.com', logoUrl: '', isActive: true, sortOrder: 4 },
  { id: 'sp-8', name: 'Microsoft', tier: 'bronze', websiteUrl: 'https://microsoft.com', logoUrl: '', isActive: true, sortOrder: 1 },
  { id: 'sp-9', name: 'Amazon Web Services', tier: 'bronze', websiteUrl: 'https://aws.amazon.com', logoUrl: '', isActive: true, sortOrder: 2 },
  { id: 'sp-10', name: 'Google Cloud', tier: 'bronze', websiteUrl: 'https://cloud.google.com', logoUrl: '', isActive: true, sortOrder: 3 },
]

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#comunidad', label: 'Comunidad' },
  { href: '/#eventos', label: 'Eventos' },
  { href: '/#sponsors', label: 'Sponsors' },
]

export const footerLinks = {
  navigation: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#comunidad', label: 'Comunidad' },
    { href: '/#eventos', label: 'Eventos' },
    { href: '/#sponsors', label: 'Sponsors' },
  ],
  community: [
    { href: '/sobre-jug-panama', label: 'Sobre JUG Panama' },
    { href: '/conviertete-en-sponsor', label: 'Conviértete en sponsor' },
    { href: '/codigo-de-conducta', label: 'Código de conducta' },
    { href: '/contactanos', label: 'Contáctanos' },
  ],
}
