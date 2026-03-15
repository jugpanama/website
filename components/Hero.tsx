'use client'

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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-5 px-3 sm:px-6 min-w-0">
      <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-[#22385A]">{value}</span>
      <span className="text-[11px] sm:text-sm text-gray-500 mt-1 text-center leading-tight">{label}</span>
    </div>
  )
}

export default function Hero({ stats, primaryCtaHref, primaryCtaLabel }: HeroProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex items-center justify-center"
      style={{
        background: 'linear-gradient(155deg, #2F4F7A 0%, #2B4870 35%, #22385A 72%, #1a2e4a 100%)',
      }}
    >
      {/* ── Decorations inside overflow-hidden wrapper ─────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,33,55,0.22)_0%,rgba(20,33,55,0.38)_58%,rgba(20,33,55,0.48)_100%)] sm:bg-[linear-gradient(180deg,rgba(20,33,55,0.06)_0%,rgba(20,33,55,0.16)_52%,rgba(20,33,55,0.22)_100%)]" />

        {/* Ambient glow blobs */}
        <div className="absolute top-[5%] right-[-8%] h-[55%] w-[50%] rounded-full bg-orange-400/16 blur-[90px] sm:bg-orange-400/20" />
        <div className="absolute top-[35%] right-[10%] hidden h-[40%] w-[35%] rounded-full bg-sky-400/15 blur-[80px] sm:block" />
        <div className="absolute bottom-0 right-[20%] h-[40%] w-[40%] rounded-full bg-orange-300/10 blur-[70px]" />

        {/* SVG curved aurora rays */}
        <svg
          className="absolute right-[-22%] top-0 h-full w-[110%] opacity-55 sm:right-0 sm:w-[65%] sm:opacity-100"
          viewBox="0 0 700 700"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="ray-orange" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#F89820" stopOpacity="0" />
              <stop offset="40%" stopColor="#F89820" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFAD40" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ray-orange-thin" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#F89820" stopOpacity="0" />
              <stop offset="50%" stopColor="#F89820" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F89820" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ray-blue" x1="0%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#7EB8F7" stopOpacity="0" />
              <stop offset="45%" stopColor="#7EB8F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Main wide orange ray */}
          <path
            d="M 780 -80 Q 520 180 620 580 Q 660 720 520 880"
            stroke="url(#ray-orange)"
            strokeWidth="65"
            strokeLinecap="round"
          />
          {/* Secondary narrow orange ray */}
          <path
            d="M 840 80 Q 620 280 700 620"
            stroke="url(#ray-orange-thin)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          {/* Blue ray */}
          <path
            d="M 720 -120 Q 480 130 570 480 Q 600 600 490 780"
            stroke="url(#ray-blue)"
            strokeWidth="50"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-20 md:pt-24 pb-24 sm:pb-28 md:pb-32">
        {/* Eyebrow */}
        <p className="animate-fade-in-up mb-5 inline-flex items-center gap-2 rounded-full border border-[#F89820]/35 bg-[#F89820]/10 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD8A6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F89820] pulse-dot" />
          Comunidad Java en Panamá
        </p>

        {/* Main Headline */}
        <h1 id="hero-title" className="animate-fade-in-up-delay-1 mx-auto max-w-[12.5ch] text-[2.45rem] sm:max-w-none sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] sm:leading-tight mb-5 sm:mb-6 text-balance">
          El punto de encuentro para la comunidad <span className="text-[#F89820]">Java</span> en Panamá
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-[16px] sm:text-lg md:text-xl text-[#D6DCE3] max-w-[22rem] sm:max-w-[34rem] mx-auto mb-8 sm:mb-10 leading-relaxed">
          Panama JUG conecta desarrolladores, speakers, sponsors y partners a través de meetups técnicos presenciales y virtuales.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up-delay-3 flex justify-center">
          <a
            href={primaryCtaHref}
            className="focus-ring-inverse tap-target inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F89820] px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
          >
            {primaryCtaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </div>

      {/* ── Floating stats card (Jakarta EE-style bottom bar) ─────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center px-4 sm:px-6 lg:px-8 translate-y-1/2" aria-label="Estadísticas de la comunidad">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex divide-x divide-gray-100">
            <StatCard value={`+${stats.completedEvents}`} label="Eventos realizados" />
            <StatCard value={`+${stats.upcomingEvents}`} label="Eventos programados" />
            <StatCard value={`${stats.years}`} label={stats.years === 1 ? 'Año de comunidad' : 'Años de comunidad'} />
          </div>
        </div>
      </div>
    </section>
  )
}
