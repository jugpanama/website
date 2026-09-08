import { Linkedin } from 'lucide-react'
import TrackedLink from '@/components/TrackedLink'
import { analyticsEvents } from '@/lib/analytics-events'

interface ShareNoteProps {
  noteId: string
  title: string
  url: string
}

export default function ShareNote({ noteId, title, url }: ShareNoteProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title} — Panama JUG`)
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const xUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=panamajug`

  return (
    <section className="note-share" aria-labelledby="note-share-title">
      <div className="note-share-copy">
        <h2 id="note-share-title">Compartir esta Note</h2>
        <p>Ayuda a que esta conversación llegue a más profesionales de tecnología.</p>
      </div>
      <ul className="note-share-actions" aria-label="Opciones para compartir">
        <li>
          <TrackedLink
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName={analyticsEvents.noteShare}
            eventParams={{ note_id: noteId, share_method: 'linkedin' }}
            className="note-share-button focus-ring"
            aria-label={`Compartir ${title} en LinkedIn`}
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            LinkedIn
          </TrackedLink>
        </li>
        <li>
          <TrackedLink
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName={analyticsEvents.noteShare}
            eventParams={{ note_id: noteId, share_method: 'x' }}
            className="note-share-button focus-ring"
            aria-label={`Compartir ${title} en X`}
          >
            X
          </TrackedLink>
        </li>
      </ul>
    </section>
  )
}
