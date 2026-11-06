import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SITE } from '../config/site'
import useTitle from '../hooks/useTitle'

export default function Contact() {
  useTitle('Contact Us')
  const [f, setF] = useState({ name: '', phone: '', message: '' })
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })

  // No backend needed: the form opens WhatsApp with the message pre-filled.
  // Swap this for an API call / Formspree / EmailJS if you prefer email.
  const submit = (e) => {
    e.preventDefault()
    const text = `Hello ${SITE.name}, I'm ${f.name} (${f.phone}).\n${f.message}`
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <div className="container page">
      <h1 className="page-title">Contact Us</h1>
      <div className="contact">
        <div className="panel">
          <h3>We'd love to hear from you</h3>
          <a className="c-row" href={`tel:${SITE.phone}`}><Phone size={20} /> {SITE.phone}</a>
          <a className="c-row" href={`mailto:${SITE.email}`}><Mail size={20} /> {SITE.email}</a>
          <a className="c-row" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /> WhatsApp</a>
          <span className="c-row"><MapPin size={20} /> {SITE.address}</span>
        </div>
        <form className="panel" onSubmit={submit}>
          <h3>Send a message</h3>
          <label className="field">Your name<input value={f.name} onChange={on('name')} required /></label>
          <label className="field">Phone<input value={f.phone} onChange={on('phone')} inputMode="tel" required /></label>
          <label className="field">Message<textarea rows="4" value={f.message} onChange={on('message')} required /></label>
          <button className="btn btn-whatsapp btn-lg btn-block"><MessageCircle size={18} /> Send via WhatsApp</button>
        </form>
      </div>
    </div>
  )
}
