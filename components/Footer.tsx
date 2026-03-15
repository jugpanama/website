"use client"

import { usePathname } from 'next/navigation'
import { footerLinks } from '@/lib/data'
import type { Event } from '@/lib/data'
import { Github as GitHubIcon, Linkedin, Youtube, Twitter } from 'lucide-react'
import packageJson from '@/package.json'

const socialLinks = [
  { icon: GitHubIcon, href: 'https://github.com/jugpanama', label: 'GitHub', target: '_blank', rel: 'noopener noreferrer' },
  { icon: Linkedin, href: 'https://linkedin.com/company/jugpanama', label: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
  { icon: Youtube, href: 'https://youtube.com/@jugpanama', label: 'YouTube', target: '_blank', rel: 'noopener noreferrer' },
  { icon: Twitter, href: 'https://twitter.com/panamajug', label: 'Twitter', target: '_blank', rel: 'noopener noreferrer' },
]

export default function Footer({ nextEvent = null }: { nextEvent?: Event | null }) {
  const pathname = usePathname()
  const siteVersion = packageJson.version

  function sectionHref(href: string) {
    if (pathname !== '/') return href
    const hash = href.includes('#') ? href.slice(href.indexOf('#')) : href
    return hash
  }

  return (
    <footer aria-label="Pie de página" className="bg-[#22385A] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 gap-12 mb-12 sm:grid-cols-2 ${nextEvent ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {/* Brand Column */}
          <div>
            <a href={sectionHref('/#inicio')} className="focus-ring-inverse mb-4 flex items-center rounded-md">
              <span className="text-xl font-bold tracking-tight text-white">
                Panama<span className="text-[#F89820]">JUG</span>
              </span>
            </a>
            <p className="text-[#CED4DA] text-sm mb-6">
              La comunidad Java de Panamá
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel={social.rel}
                  className="focus-ring-inverse tap-target inline-flex items-center justify-center rounded-md text-white transition-colors hover:text-[#F89820]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={sectionHref(link.href)}
                    className="focus-ring-inverse rounded-md text-sm text-[#CED4DA] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Comunidad</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={sectionHref(link.href)}
                    className="focus-ring-inverse rounded-md text-sm text-[#CED4DA] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Event Column */}
          {nextEvent && (
            <div>
              <h4 className="font-semibold text-white mb-4">Próximo evento</h4>
              <div className="bg-[#2F4F7A] rounded-lg p-4 border border-white/10">
                <p className="font-mono text-xs text-[#F89820] mb-2">
                  {nextEvent.displayDate ?? 'Fecha por confirmar'}
                </p>
                <p className="text-white text-sm font-medium mb-3 line-clamp-2">
                  {nextEvent.title}
                </p>
                <a
                  href="/eventos/proximos"
                  aria-label={`Ver agenda del próximo evento: ${nextEvent.title}`}
                  className="focus-ring-inverse tap-target inline-flex items-center justify-center rounded bg-[#F89820] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#DD7A0A]"
                >
                  Ver agenda
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#CED4DA]">
            © 2026 Panama JUG.
          </p>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <p className="text-sm text-[#CED4DA]">
              Hecho con ☕ en Panamá
            </p>
            <p className="text-xs text-[#ADB5BD]">Version v{siteVersion}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
