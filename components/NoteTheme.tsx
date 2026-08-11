'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

type ThemePreference = 'system' | 'light' | 'dark'
type ResolvedTheme = 'light' | 'dark'

interface NoteThemeContextValue {
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: (theme: ThemePreference) => void
}

const STORAGE_KEY = 'panama-jug-notes-theme'
const NoteThemeContext = createContext<NoteThemeContextValue>({
  preference: 'system',
  resolvedTheme: 'light',
  setPreference: () => undefined,
})

export function NoteThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('system')
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemTheme = () => setSystemTheme(media.matches ? 'dark' : 'light')
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)

    if (savedTheme === 'system' || savedTheme === 'light' || savedTheme === 'dark') {
      setPreferenceState(savedTheme)
    }
    updateSystemTheme()
    media.addEventListener('change', updateSystemTheme)
    return () => media.removeEventListener('change', updateSystemTheme)
  }, [])

  function setPreference(theme: ThemePreference) {
    setPreferenceState(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }

  const resolvedTheme = preference === 'system' ? systemTheme : preference

  return (
    <NoteThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>
      <div className="note-shell" data-note-theme={preference} data-resolved-theme={resolvedTheme}>
        {children}
      </div>
    </NoteThemeContext.Provider>
  )
}

export function NoteThemeControls() {
  const { preference, setPreference } = useNoteTheme()
  const themes: Array<{ value: ThemePreference; label: string; icon: typeof Monitor }> = [
    { value: 'system', label: 'Sistema', icon: Monitor },
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Oscuro', icon: Moon },
  ]

  return (
    <fieldset className="note-theme-controls">
      <legend className="sr-only">Tema de lectura</legend>
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={preference === value}
          aria-label={`Usar tema ${label.toLowerCase()}`}
          title={label}
          onClick={() => setPreference(value)}
          className="note-theme-button"
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </fieldset>
  )
}

export function useNoteTheme() {
  return useContext(NoteThemeContext)
}
