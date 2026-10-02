'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { analyticsEvents } from '@/lib/analytics-events'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')

  const navLinks = [
    { href: '/#inicio', label: t('home') },
    { href: '/#comunidad', label: t('community') },
    { href: '/#eventos', label: t('events') },
    { href: '/notas', label: t('notes') },
    { href: '/unete', label: t('participate') },
  ]

  function switchLocale(nextLocale: 'es' | 'en') {
    if (nextLocale === locale) return

    const segments = pathname.split('/').filter(Boolean)
    const hasLocale = segments[0] === 'es' || segments[0] === 'en'
    const routeSegments = hasLocale ? segments.slice(1) : segments
    const target = routeSegments.length > 0 ? `/${nextLocale}/${routeSegments.join('/')}` : `/${nextLocale}`
    router.push(target)
  }

  function sectionHref(href: string) {
    if (pathname !== '/') return href
    const hash = href.includes('#') ? href.slice(href.indexOf('#')) : href
    return hash
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <nav
      aria-label={t('mainNavigation')}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled' : 'navbar-blend'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <Link
            href={sectionHref('/#inicio')}
            className="focus-ring-inverse inline-flex min-w-0 items-center gap-1.5 rounded-md"
            aria-label="Ir al inicio de Panama JUG"
          >
            <Image
              src="/jugpanlogo.png"
              alt="Logo Panama JUG"
              width={32}
              height={32}
              className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              priority
            />
            <span aria-hidden="true" className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="truncate text-base font-bold leading-none tracking-tight text-white sm:text-xl">
              Panama <span className="text-[#F89820]">JUG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={sectionHref(link.href)}
                  onClick={() => trackEvent(analyticsEvents.navigationClick, { link_group: 'navbar', link_name: link.label })}
                  className="focus-ring-inverse rounded-md px-1 py-1 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-0.5" aria-label="Language selector">
            <button
              type="button"
              onClick={() => switchLocale('es')}
              aria-pressed={locale === 'es'}
              aria-label="Switch to Spanish"
              title="Español"
              className={`min-h-10 min-w-10 rounded-md px-2 py-1 text-[11px] font-bold tracking-wide transition-colors md:min-h-8 md:min-w-8 md:text-xs ${locale === 'es' ? 'bg-white/95 text-[#22385A] shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => switchLocale('en')}
              aria-pressed={locale === 'en'}
              aria-label="Switch to English"
              title="English"
              className={`min-h-10 min-w-10 rounded-md px-2 py-1 text-[11px] font-bold tracking-wide transition-colors md:min-h-8 md:min-w-8 md:text-xs ${locale === 'en' ? 'bg-white/95 text-[#22385A] shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="focus-ring-inverse tap-target p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label={t('closeMenu')}
            className="fixed inset-0 top-16 z-30 bg-[#0D1A2D]/72 backdrop-blur-[2px] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            id="mobile-navigation"
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-white/12 bg-[#22385A]/98 p-3 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] md:hidden"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={sectionHref(link.href)}
                    onClick={() => {
                      trackEvent(analyticsEvents.navigationClick, { link_group: 'navbar_mobile', link_name: link.label })
                      setIsMobileMenuOpen(false)
                    }}
                    className="focus-ring-inverse tap-target block rounded-lg px-3 py-2.5 text-base font-semibold text-white/85 transition-colors hover:bg-white/6 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  )
}
