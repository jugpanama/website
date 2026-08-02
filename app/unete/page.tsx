import Link from 'next/link'
import { Github, Lightbulb, Linkedin, MessageSquare, Mic2, Users, Youtube } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const participationOptions = [
  {
    icon: Users,
    title: 'Asistente de actividades técnicas',
    description: 'Participa cuando publiquemos encuentros, sesiones virtuales o espacios de conversación técnica.',
  },
  {
    icon: Mic2,
    title: 'Speaker',
    description: 'Comparte una experiencia, una práctica útil o una lección aprendida dentro del ecosistema Java.',
  },
  {
    icon: MessageSquare,
    title: 'Colaborador de comunidad',
    description: 'Ayuda con contenido, difusión u organización de acuerdo con tu disponibilidad.',
  },
  {
    icon: Lightbulb,
    title: 'Propuesta de temas',
    description: 'Sugiere preguntas, tecnologías o casos reales para futuras Panama JUG Notes y actividades.',
  },
]

const communityChannels = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/jugpanama' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/jugpanama' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@jugpanama' },
]

export default function UnetePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="px-4 pb-16 pt-20 md:pb-20 md:pt-24">
        <section className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2F4F7A]/25 bg-[#2F4F7A]/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22385A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F89820]" />
            Participa
          </p>
          <h1 className="mb-4 max-w-3xl text-3xl font-bold text-[#212529] md:text-5xl">
            Construyamos la próxima etapa de Panama JUG
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[#495057] md:text-lg">
            No necesitas esperar a que exista un evento programado. Puedes participar compartiendo
            ideas, conocimiento técnico o tiempo para ayudar a desarrollar la comunidad de forma sostenible.
          </p>
        </section>

        <section aria-labelledby="participation-options-title" className="mx-auto mt-12 max-w-5xl">
          <h2 id="participation-options-title" className="mb-6 text-2xl font-bold text-[#212529]">
            Formas de participar
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {participationOptions.map((option) => (
              <article key={option.title} className="rounded-2xl border border-[#DCE3EC] bg-white p-6">
                <option.icon className="mb-4 h-7 w-7 text-[#F89820]" />
                <h3 className="mb-2 font-semibold text-[#212529]">{option.title}</h3>
                <p className="text-sm leading-relaxed text-[#6C757D]">{option.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="community-channels-title" className="mx-auto mt-12 max-w-5xl">
          <div className="rounded-2xl bg-[#22385A] p-6 text-white md:p-8">
            <h2 id="community-channels-title" className="text-2xl font-bold">Conversemos</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#D7E1EE] md:text-base">
              Escríbenos para proponer un tema, una charla o una colaboración comunitaria. También puedes seguir los canales oficiales.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contactanos"
                className="focus-ring-inverse tap-target inline-flex items-center justify-center rounded-lg bg-[#F89820] px-5 py-3 text-sm font-semibold text-white hover:bg-[#DD7A0A]"
              >
                Enviar una propuesta
              </Link>
              {communityChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse tap-target inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
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
