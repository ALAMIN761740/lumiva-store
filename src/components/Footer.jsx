import { Link } from 'react-router-dom'
import { Banknote, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, RotateCcw, ShieldCheck, Truck, Youtube } from 'lucide-react'
import Logo from './Logo'
import { SITE } from '../config/site'

const TRUST = [
  { icon: ShieldCheck, title: '100% Authentic', text: 'Genuine, carefully sourced products' },
  { icon: Banknote, title: 'Cash on Delivery', text: 'Pay when your order arrives' },
  { icon: Truck, title: 'Nationwide Delivery', text: 'Inside & outside Dhaka' },
  { icon: RotateCcw, title: 'Easy Returns', text: 'Report issues within 7 days' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container trust">
        {TRUST.map((t) => (
          <div className="trust-item" key={t.title}>
            <t.icon size={28} />
            <div>
              <strong>{t.title}</strong>
              <span>{t.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p>{SITE.description}</p>
            <div className="social">
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={SITE.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            <Link to="/shop?cat=skin-care">Skin Care</Link>
            <Link to="/shop?cat=make-up">Make Up</Link>
            <Link to="/shop?cat=hair-care">Hair Care</Link>
            <Link to="/shop?cat=mens-grooming">Men's Grooming</Link>
            <Link to="/shop?cat=baby-care">Mom & Baby</Link>
            <Link to="/shop">All Products</Link>
          </div>

          <div>
            <h4>Customer Care</h4>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping-and-delivery">Shipping & Delivery</Link>
            <Link to="/return-and-refund">Return & Refund</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <a href={`tel:${SITE.phone}`}><Phone size={15} /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}><Mail size={15} /> {SITE.email}</a>
            <span className="addr"><MapPin size={15} /> {SITE.address}</span>
            <a className="btn btn-whatsapp" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-in">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Cash on Delivery available</span>
        </div>
      </div>
    </footer>
  )
}
