import { ExternalLink } from 'lucide-react'
import type { NoteAuthor } from '@/lib/data'

export default function AboutNoteAuthor({ author }: { author: NoteAuthor }) {
  return (
    <section aria-labelledby="note-author-title" className="note-closing-section note-author-card">
      <h2 id="note-author-title" className="note-section-title">Sobre el autor</h2>
      <div className="note-author-profile">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="note-author-avatar"
          />
        )}
        <div className="note-author-details">
          <p className="note-author-name">{author.name}</p>
          {author.role && <p className="note-author-role">{author.role}</p>}
          {author.bio && <p className="note-author-bio">{author.bio}</p>}
          {author.links.length > 0 && (
            <ul className="note-author-links" aria-label={`Enlaces de ${author.name}`}>
              {author.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="note-inline-link">
                    {link.label} <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
