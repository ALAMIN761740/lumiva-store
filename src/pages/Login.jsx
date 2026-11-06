import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

export default function Login() {
  useTitle('Login')
  const { user, login } = useAuth()
  const nav = useNavigate()
  const from = useLocation().state?.from || '/account'
  const [f, setF] = useState({ identifier: '', password: '' })
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      await login(f)
      nav(from, { replace: true })
    } catch (x) {
      setErr(x.message)
      setBusy(false)
    }
  }

  return (
    <div className="container page auth">
      <form className="panel auth-card" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p className="muted">Log in to view your orders and checkout faster.</p>
        {err && <p className="notice err">{err}</p>}
        <label className="field">Phone or email
          <input value={f.identifier} onChange={(e) => setF({ ...f, identifier: e.target.value })} autoComplete="username" required />
        </label>
        <label className="field">Password
          <div className="pw">
            <input type={show ? 'text' : 'password'} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="current-password" required />
            <button type="button" aria-label="Show password" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </label>
        {/* TODO: add "Forgot password" once a real backend is connected */}
        <button className="btn btn-primary btn-lg btn-block" disabled={busy}>{busy ? 'Logging in…' : 'Log In'}</button>
        <p className="center-text">New here? <Link to="/register" state={{ from }}>Create an account</Link></p>
      </form>
    </div>
  )
}
