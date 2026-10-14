import { useState } from 'react'

type Props = {
  youtubeId: string
  title: string
  posterSrc: string
  continueLabel?: string
  onContinue: () => void
}

export function CourseVideo({
  youtubeId,
  title,
  posterSrc,
  continueLabel = 'Continue',
  onContinue,
}: Props) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="ms-video">
      <div className="ms-video-frame">
        {playing ? (
          <iframe
            className="ms-video-iframe"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="ms-video-cover"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
          >
            <img src={posterSrc} alt="" className="ms-video-poster" />
            <span className="ms-video-play" aria-hidden>
              <span className="ms-video-play-tri" />
            </span>
            <span className="mono ms-video-cover-label">Play video</span>
          </button>
        )}
      </div>

      <p className="ms-foot mono" style={{ marginTop: 16 }}>
        Educational only · Not financial advice
      </p>

      <button type="button" className="btn btn-primary" style={{ marginTop: 28 }} onClick={onContinue}>
        {continueLabel}
      </button>
    </div>
  )
}
