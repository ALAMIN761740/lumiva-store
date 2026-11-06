import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { SITE } from '../config/site'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label={`${SITE.name} home`}>
      <span className="logo-mark">
        <Sparkles size={20} />
      </span>
      <span className="logo-text">{SITE.name}</span>
    </Link>
  )
}
