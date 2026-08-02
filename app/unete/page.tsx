import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Github,
  Lightbulb,
  Linkedin,
  MessageSquare,
  Mic2,
  Twitter,
  Users,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const participationPaths = [
  {
    icon: Users,
    title: 'Asistir a actividades',
    description: 'Consulta las actividades publicadas. Si todavía no hay una fecha confirmada, puedes participar desde ahora proponiendo temas y siguiendo los canales oficiales.',
    href: '/eventos/proximos',
    action: 'Consultar actividades',
  },
  {
    icon: Mic2,
    title: 'Proponer una charla',
    description: 'Comparte una experiencia técnica mediante Sessionize, tanto si ya has dado charlas como si sería tu primera vez.',
    href: '#comparte-conocimiento',
    action: 'Conocer el proceso',
  },
  {
    icon: MessageSquare,
    title: 'Colaborar con la comunidad',
    description: 'Aporta ideas, contenido técnico, documentación o ayuda puntual para futuras actividades.',
    href: '#contribuir',
    action: 'Ver formas de contribuir',
  },
  {
    icon: Building2,
    title: 'Colaboración institucional',
    description: 'Las organizaciones pueden conversar sobre apoyos concretos y compatibles con las necesidades reales de la comunidad.',
    href: '/contactanos',
    action: 'Iniciar una conversación',
  },
]

const suggestedTopics = [
  'Java',
  'JVM',
  'Jakarta EE',
  'Spring',
  'Cloud Native',
  'Arquitectura de software',
  'Open Source',
]

const contributionIdeas = [
  'Propuestas de mejora',
  'Sugerencias de contenido',
  'Documentación',
  'Ideas para actividades',
]

const communityChannels = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/jugpanama' },
  { icon: Twitter, label: 'X', href: 'https://x.com/panamajug' },
]

export default function UnetePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pb-16 pt-20 md:pb-20 md:pt-24">
        <section className="px-4">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
              Participa
            </p>
            <h1 className="mb-4 max-w-3xl text-3xl font-bold text-[#212529] md:text-5xl">
              Participa y ayuda a construir Panama JUG
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[#495057] md:text-lg">
              No necesitas esperar a que exista un evento programado. Puedes asistir, compartir
              conocimiento, proponer ideas o colaborar de acuerdo con tu experiencia y disponibilidad.
            </p>
          </div>
        </section>

        <section aria-labelledby="participation-paths-title" className="mx-auto mt-12 max-w-5xl px-4">
          <h2 id="participation-paths-title" className="mb-6 text-2xl font-bold text-[#212529]">
            Elige cómo participar
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {participationPaths.map((path) => (
              <article key={path.title} className="flex flex-col rounded-2xl border border-[#DCE3EC] bg-white p-6">
                <path.icon className="mb-4 h-7 w-7 text-[#F89820]" />
                <h3 className="mb-2 font-semibold text-[#212529]">{path.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#6C757D]">{path.description}</p>
                <Link
                  href={path.href}
                  className="focus-ring mt-auto inline-flex items-center gap-1.5 self-start rounded-md text-sm font-semibold text-[#2F4F7A] hover:text-[#22385A]"
                >
                  {path.action} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="comparte-conocimiento" aria-labelledby="speaker-title" className="mt-16 bg-[#22385A] px-4 py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#F8B04A]">
                Canal oficial para speakers
              </p>
              <h2 id="speaker-title" className="text-3xl font-bold md:text-4xl">Comparte conocimiento</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-[#D7E1EE]">
                Invitamos a desarrolladores, arquitectos y profesionales de tecnología a compartir
                experiencias reales con la comunidad. No necesitas ser sénior ni haber presentado antes:
                las primeras charlas también son bienvenidas.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {suggestedTopics.map((topic) => (
                  <span key={topic} className="rounded-full border border-white/15 bg-white/7 px-3 py-1.5 text-xs font-medium text-[#E6EDF7]">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/7 p-6">
              <Mic2 className="h-8 w-8 text-[#F89820]" />
              <h3 className="mt-4 text-xl font-bold">Envía tu propuesta en Sessionize</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#D7E1EE]">
                Sessionize es el canal oficial para recibir y organizar las propuestas de charlas de Panama JUG.
              </p>
              <a
                href="https://sessionize.com/panama-jug-2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring-inverse tap-target mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F89820] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
              >
                Proponer una charla <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="contribuir" aria-labelledby="contribute-title" className="mx-auto mt-16 max-w-5xl px-4">
          <div className="grid gap-8 rounded-2xl border border-[#DCE3EC] bg-white p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2F4F7A]">
                <Lightbulb className="h-4 w-4 text-[#F89820]" />
                Contribuir
              </p>
              <h2 id="contribute-title" className="text-2xl font-bold text-[#212529] md:text-3xl">
                Aportes técnicos y conocimiento compartido
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#495057] md:text-base">
                Puedes colaborar con Panama JUG sin asumir un cargo formal. Cada propuesta se puede
                adaptar al tiempo y experiencia de quien participa.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {contributionIdeas.map((idea) => (
                  <li key={idea} className="flex items-center gap-2 text-sm text-[#495057]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F89820]" />
                    {idea}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-[#F5F8FC] p-6">
              <Github className="h-8 w-8 text-[#22385A]" />
              <h3 className="mt-4 text-lg font-bold text-[#212529]">Colabora desde GitHub</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6C757D]">
                Explora los repositorios existentes y comparte propuestas de mejora o documentación.
              </p>
              <a
                href="https://github.com/jugpanama"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-5 inline-flex items-center gap-2 self-start rounded-md text-sm font-semibold text-[#2F4F7A] hover:text-[#22385A]"
              >
                Ver GitHub de Panama JUG <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-channels-title" className="mx-auto mt-12 max-w-5xl px-4">
          <div className="rounded-2xl border border-[#DCE3EC] bg-white p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div>
              <h2 id="contact-channels-title" className="text-2xl font-bold text-[#212529]">¿Tienes otra propuesta?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6C757D]">
                Usa el formulario para indicar cómo te gustaría participar o conversa con la comunidad en sus canales oficiales.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
              <Link
                href="/contactanos"
                className="focus-ring tap-target inline-flex items-center justify-center rounded-lg bg-[#F89820] px-5 py-3 text-sm font-semibold text-white hover:bg-[#DD7A0A]"
              >
                Contactar
              </Link>
              {communityChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring tap-target inline-flex items-center justify-center gap-2 rounded-lg border border-[#CED4DA] px-4 py-3 text-sm font-semibold text-[#22385A] transition-colors hover:border-[#2F4F7A]"
                >
                  <channel.icon className="h-4 w-4" />
                  {channel.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
