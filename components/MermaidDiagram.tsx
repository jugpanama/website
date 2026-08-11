'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useNoteTheme } from '@/components/NoteTheme'

let mermaidLoader: Promise<typeof import('mermaid').default> | null = null

function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then(({ default: mermaid }) => mermaid)
  }

  return mermaidLoader
}

interface MermaidDiagramProps {
  chart: string
  figureNumber: number
  caption?: string
  attribution?: string
}

export default function MermaidDiagram({ chart, figureNumber, caption, attribution }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const reactId = useId()
  const [error, setError] = useState(false)
  const { resolvedTheme } = useNoteTheme()

  useEffect(() => {
    let cancelled = false
    const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`

    async function renderDiagram() {
      try {
        if (!/^\s*accTitle:/m.test(chart) || !/^\s*accDescr(?::|\s*\{)/m.test(chart)) {
          throw new Error('Mermaid diagrams require accTitle and accDescr')
        }

        const mermaid = await loadMermaid()
        const dark = resolvedTheme === 'dark'
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          flowchart: { htmlLabels: false },
          themeVariables: {
            fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
            background: dark ? '#17253A' : '#FFFFFF',
            primaryColor: dark ? '#243B5C' : '#F5F8FC',
            primaryTextColor: dark ? '#F8F9FA' : '#212529',
            primaryBorderColor: dark ? '#7FA5D6' : '#2F4F7A',
            lineColor: dark ? '#9DB8DA' : '#2F4F7A',
            secondaryColor: dark ? '#4A351C' : '#FFF3E0',
            tertiaryColor: dark ? '#1D304A' : '#FFFFFF',
          },
        })
        const { svg } = await mermaid.render(diagramId, chart)
        if (cancelled || !containerRef.current) return

        const documentNode = new DOMParser().parseFromString(svg, 'image/svg+xml')
        const svgNode = documentNode.documentElement
        if (svgNode.nodeName.toLowerCase() !== 'svg') throw new Error('Mermaid did not return an SVG')

        containerRef.current.setAttribute('aria-busy', 'false')
        containerRef.current.replaceChildren(document.importNode(svgNode, true))
        setError(false)
      } catch {
        if (!cancelled) setError(true)
      }
    }

    renderDiagram()
    return () => {
      cancelled = true
    }
  }, [chart, reactId, resolvedTheme])

  if (error) {
    return (
      <span className="mermaid-error" role="alert">
        <span>No fue posible renderizar este diagrama. Puedes consultar su definición:</span>
        <code>{chart}</code>
      </span>
    )
  }

  return (
    <span className="mermaid-diagram">
      <span ref={containerRef} className="mermaid-canvas" aria-busy={!containerRef.current}>
        <span className="mermaid-loading">Generando diagrama…</span>
      </span>
      {(caption || attribution) && (
        <span className="note-figure-caption">
          {caption && <span><strong>Figura {figureNumber}.</strong> {caption}</span>}
          {attribution && <span className="note-figure-attribution">{attribution}</span>}
        </span>
      )}
    </span>
  )
}
