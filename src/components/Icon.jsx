import {
  Baby, Bath, Brush, Droplets, Flower2, Palette, Scissors, Sparkles, SprayCan, User, Waves,
} from 'lucide-react'

const MAP = { Baby, Bath, Brush, Droplets, Flower2, Palette, Scissors, Sparkles, SprayCan, User, Waves }

export default function Icon({ name, ...props }) {
  const C = MAP[name] || Sparkles
  return <C {...props} />
}
