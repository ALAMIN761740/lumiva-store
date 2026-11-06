import { Link } from 'react-router-dom'
import { SITE, money } from '../config/site'
import useTitle from '../hooks/useTitle'

// Template copy for legal / help pages. Edit freely and have the policies
// reviewed for your business before launch.
const PAGES = {
  about: {
    title: 'About Us',
    body: [
      ['', `${SITE.name} is an online beauty and personal-care shop serving customers across Bangladesh. We bring skincare, makeup, haircare, men's grooming, fragrance and baby care together so the whole family can shop in one place.`],
      ['Our promise', 'We focus on genuine products, honest descriptions, fair prices and friendly support — with cash on delivery so you can order with confidence.'],
      ['What we sell', 'Cosmetics and personal care for women, men and babies: cleansers, serums, sunscreen, lipsticks, shampoos, beard care, baby wash and more.'],
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    body: [
      ['Are your products authentic?', 'Yes. We source products from trusted suppliers and sell only genuine items.'],
      ['How can I pay?', 'We currently accept Cash on Delivery. Pay the delivery person when your order arrives.'],
      ['How long does delivery take?', SITE.deliveryNote + '.'],
      ['How much is delivery?', `${money(SITE.shipping.insideDhaka)} inside Dhaka and ${money(SITE.shipping.outsideDhaka)} outside Dhaka. Orders above ${money(SITE.shipping.freeAbove)} ship free.`],
      ['Can I return a product?', 'If your item is damaged or wrong, contact us within 7 working days. See our Return & Refund policy.'],
      ['How do I track my order?', 'Use the Track Order page with your order number and phone number.'],
    ],
  },
  shipping: {
    title: 'Shipping & Delivery',
    body: [
      ['Delivery areas', 'We deliver all over Bangladesh.'],
      ['Delivery time', SITE.deliveryNote + '. Delays may occur during holidays, extreme weather or high-demand periods.'],
      ['Delivery charge', `${money(SITE.shipping.insideDhaka)} inside Dhaka, ${money(SITE.shipping.outsideDhaka)} outside Dhaka. Free delivery on orders above ${money(SITE.shipping.freeAbove)}.`],
      ['Order confirmation', 'We may call you to confirm your order before dispatch. Please keep your phone available.'],
    ],
  },
  returns: {
    title: 'Return & Refund Policy',
    body: [
      ['Eligibility', 'Report a damaged, defective or wrong item within 7 working days of delivery, with photos/video of the unopened parcel where possible.'],
      ['Hygiene', 'For safety and hygiene reasons, opened or used cosmetic and baby-care products cannot be returned unless defective.'],
      ['Refunds', 'Approved returns are exchanged for the correct item or refunded to your preferred method within 7 working days.'],
      ['How to claim', `Contact us on ${SITE.phone} or ${SITE.email} with your order number.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      ['Using this site', `By using ${SITE.name} you agree to these terms. We may update them from time to time.`],
      ['Orders & pricing', 'Prices are in Bangladeshi Taka and may change without notice. We may cancel orders for stock or pricing errors, or if we cannot reach you to confirm.'],
      ['Product information', 'We try to keep descriptions accurate, but packaging and formulas can change. Always read the label and patch-test before use.'],
      ['Liability', 'Cosmetic reactions vary by person. Stop use and consult a doctor if irritation occurs.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      ['Information we collect', 'Name, phone, email and delivery address you provide when ordering or creating an account.'],
      ['How we use it', 'To process and deliver orders, provide support and (with your consent) send offers. We do not sell your personal data.'],
      ['Cookies & storage', 'We use your browser storage to remember your cart, wishlist and login on this device.'],
      ['Your choices', `Contact ${SITE.email} to access, correct or delete your information.`],
    ],
  },
}

export default function Info({ page }) {
  const p = PAGES[page]
  useTitle(p.title)
  return (
    <div className="container page narrow">
      <nav className="crumbs"><Link to="/">Home</Link> / <span>{p.title}</span></nav>
      <h1 className="page-title">{p.title}</h1>
      <div className="prose panel">
        {p.body.map(([h, t], i) => (
          <section key={i}>
            {h && <h3>{h}</h3>}
            <p>{t}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
