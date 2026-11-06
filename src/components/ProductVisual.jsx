import { useState } from 'react'
import Icon from './Icon'
import { getCategory } from '../data/products'

// Local demo products use a token-coloured placeholder. Products imported from
// the live API show their real thumbnail on a white background (object-fit: contain).
export default function ProductVisual({ product, large = false }) {
  const [failed, setFailed] = useState(false)
  const tilt = 128 + (product.id.length % 5) * 14

  if (product.image && !failed) {
    return (
      <img
        className={`visual-img ${product.source === 'api' ? 'visual-img-api' : 'visual-img-local'}`}
        src={product.image}
        alt={product.name}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }

  const category = getCategory(product.cat)

  return (
    <div
      className={`visual ${large ? 'visual-large' : ''}`}
      style={{ '--tilt': `${tilt}deg` }}
      role="img"
      aria-label={`${product.name} placeholder artwork`}
    >
      <div className="visual-orb" aria-hidden="true" />
      <div className="visual-icon" aria-hidden="true">
        <Icon name={category?.icon} size={large ? 96 : 52} strokeWidth={1.4} />
      </div>
      <span className="visual-brand">{product.brand}</span>
      <span className="visual-size">{product.size}</span>
    </div>
  )
}
