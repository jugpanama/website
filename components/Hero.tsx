'use client'

function StatItem({ value, label, delay }: { value: string; label: string; delay: string }) {
  return (
    <div className={`text-center animate-count-up`} style={{ animationDelay: delay }}>
      <div className="font-mono text-[1.35rem] sm:text-2xl md:text-3xl font-bold text-white">{value}</div>
      <div className="text-[13px] sm:text-sm text-[#CED4DA]">{label}</div>
    </div>
  )
}

interface HeroStats {
  completedEvents: number
  upcomingEvents: number
  years: number
}

interface HeroProps {
  stats: HeroStats
  primaryCtaHref: string
  primaryCtaLabel: string
}

export default function Hero({ stats, primaryCtaHref, primaryCtaLabel }: HeroProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative min-h-[68vh] sm:min-h-[82vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2F4F7A 0%, #22385A 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none animate-float" aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-[0.15]">
          <circle cx="200" cy="200" r="180" stroke="#22385A" strokeWidth="2" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="#22385A" strokeWidth="2" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="#22385A" strokeWidth="2" fill="none" />
          <circle cx="250" cy="150" r="80" stroke="#22385A" strokeWidth="2" fill="none" />
          <circle cx="150" cy="250" r="60" stroke="#22385A" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 md:pb-16">
        {/* Eyebrow */}
        <p className="animate-fade-in-up mb-5 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD8A6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F89820] pulse-dot" />
          Comunidad Java en Panamá
        </p>

        {/* Main Headline */}
        <h1 id="hero-title" className="animate-fade-in-up-delay-1 mx-auto max-w-[14ch] text-[2rem] sm:max-w-none sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] sm:leading-tight mb-5 sm:mb-6 text-balance">
          El punto de encuentro para la comunidad <span className="text-[#F89820]">Java</span> en Panamá
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-[15px] sm:text-lg md:text-xl text-[#CED4DA] max-w-[34rem] mx-auto mb-8 sm:mb-10 leading-relaxed">
          JUG Panama conecta desarrolladores, speakers, sponsors y partners a través de meetups técnicos presenciales y virtuales.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 mb-10 sm:mb-12 flex justify-center">
          <a
            href={primaryCtaHref}
            className="focus-ring-inverse tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#DD7A0A] w-full sm:w-auto"
          >
            {primaryCtaLabel}
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-delay-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-16">
          <StatItem value={`+${stats.completedEvents}`} label="Eventos realizados" delay="0.75s" />
          <StatItem value={`+${stats.upcomingEvents}`} label="Eventos programados" delay="0.9s" />
          <StatItem value={`${stats.years}`} label="Años de comunidad" delay="1.05s" />
        </div>
      </div>
    </section>
  )
}
