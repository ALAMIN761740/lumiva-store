import { Star } from 'lucide-react'

export default function Rating({ value = 0, count = 0, size = 13, compact = false }) {
  const rating = Number(value) || 0
  const filled = Math.round(rating)

  return (
    <span className="rating" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <span className="stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={size}
            strokeWidth={1.7}
            fill={index < filled ? 'currentColor' : 'none'}
            className={index < filled ? '' : 'star-empty'}
          />
        ))}
      </span>
      {!compact && <b>{rating.toFixed(1)}</b>}
      {!compact && count > 0 && <span className="rating-count">({count})</span>}
    </span>
  )
}
