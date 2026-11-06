import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import useTitle from '../hooks/useTitle'

export default function Register() {
  useTitle('Create Account')
  const { user, register } = useAuth()
  const toast = useToast()
  const nav = useNavigate()
  const from = useLocation().state?.from || '/account'
  const [f, setF] = useState({ name: '', phone: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      await register(f)
      toast('Account created. Welcome!')
      nav(from, { replace: true })
    } catch (x) {
      setErr(x.message)
      setBusy(false)
    }
  }

  return (
    <div className="container page auth">
      <form className="panel auth-card" onSubmit={submit}>
        <h1>Create your account</h1>
        <p className="muted">Save your details, track orders and checkout faster.</p>
        {err && <p className="notice err">{err}</p>}
        <label className="field">Full name *<input value={f.name} onChange={on('name')} autoComplete="name" required /></label>
        <label className="field">Mobile number *<input value={f.phone} onChange={on('phone')} inputMode="tel" placeholder="017XXXXXXXX" autoComplete="tel" required /></label>
        <label className="field">Email (optional)<input type="email" value={f.email} onChange={on('email')} autoComplete="email" /></label>
        <label className="field">Password * (min 6 characters)<input type="password" value={f.password} onChange={on('password')} autoComplete="new-password" minLength={6} required /></label>
        <button className="btn btn-primary btn-lg btn-block" disabled={busy}>{busy ? 'Creating…' : 'Create Account'}</button>
        <p className="center-text">Already registered? <Link to="/login" state={{ from }}>Log in</Link></p>
      </form>
    </div>
  )
}
