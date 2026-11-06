import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <div className="container page">
      <div className="empty">
        <h1 className="big-404">404</h1>
        <h3>We couldn't find that page</h3>
        <p>It may have moved or no longer exists.</p>
        <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
      </div>
    </div>
  )
}
