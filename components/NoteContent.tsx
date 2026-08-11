import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MermaidDiagram from '@/components/MermaidDiagram'
import type { NoteFigure } from '@/lib/data'

function FigureCaption({ number, figure }: { number: number; figure?: NoteFigure }) {
  if (!figure?.caption && !figure?.attribution) return null

  return (
    <span className="note-figure-caption">
      {figure.caption && <span><strong>Figura {number}.</strong> {figure.caption}</span>}
      {figure.attribution && (
        <span className="note-figure-attribution">
          {figure.attributionUrl ? (
            <a href={figure.attributionUrl} target="_blank" rel="noopener noreferrer">
              {figure.attribution}
            </a>
          ) : figure.attribution}
        </span>
      )}
    </span>
  )
}

export default function NoteContent({ content, figures = [] }: { content: string; figures?: NoteFigure[] }) {
  let figureIndex = 0

  function nextFigure() {
    const number = figureIndex + 1
    const figure = figures[figureIndex]
    figureIndex += 1
    return { number, figure }
  }

  const components: Components = {
    a({ href = '', children, node: _node, ...props }) {
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      )
    },
    img({ src = '', alt = '', node: _node, ...props }) {
      if (typeof src !== 'string' || !src.startsWith('/notas/')) return null
      const { number, figure } = nextFigure()
      return (
        <span className="note-figure">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            {...props}
            width={figure?.width}
            height={figure?.height}
          />
          <FigureCaption number={number} figure={figure} />
        </span>
      )
    },
    table({ children, node: _node, ...props }) {
      return (
        <div className="note-table-scroll" tabIndex={0} role="region" aria-label="Tabla con desplazamiento horizontal">
          <table {...props}>{children}</table>
        </div>
      )
    },
    code({ className, children, node: _node, ...props }) {
      if (className === 'language-mermaid') {
        const { number, figure } = nextFigure()
        return (
          <MermaidDiagram
            chart={String(children).replace(/\n$/, '')}
            figureNumber={number}
            caption={figure?.caption}
            attribution={figure?.attribution}
          />
        )
      }

      return <code className={className} {...props}>{children}</code>
    },
  }

  return (
    <div className="note-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {content}
      </ReactMarkdown>
    </div>
  )
}
