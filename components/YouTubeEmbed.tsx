const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  if (!YOUTUBE_ID_PATTERN.test(id) || !title.trim()) return null

  return (
    <figure className="note-video">
      <div className="note-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption>
        {title}.{' '}
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
          Ver directamente en YouTube
        </a>
        .
      </figcaption>
    </figure>
  )
}
