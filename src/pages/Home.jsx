import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Baby,
  Banknote,
  Check,
  Flower2,
  Gift,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
} from 'lucide-react'
import Icon from '../components/Icon'
import { ProductRow, SectionHead } from '../components/Section'
import { AUDIENCES } from '../data/products'
import { SITE } from '../config/site'
import { useProducts } from '../context/ProductContext'
import useTitle from '../hooks/useTitle'

const STEPS = [
  { n: 1, t: 'Cleanse', d: 'Start fresh with a gentle cleanser.', to: '/shop?q=cleanser' },
  { n: 2, t: 'Tone', d: 'Balance and prep your skin.', to: '/shop?q=toner' },
  { n: 3, t: 'Treat', d: 'Target concerns with a serum.', to: '/shop?q=serum' },
  { n: 4, t: 'Moisturize', d: 'Lock in hydration all day.', to: '/shop?q=cream' },
  { n: 5, t: 'Protect', d: 'Finish with daily sunscreen.', to: '/shop?q=sun' },
]

const WHY = [
  { icon: ShieldCheck, title: '100% authentic', text: 'Genuine products, carefully sourced' },
  { icon: Banknote, title: 'Cash on delivery', text: 'Pay when your order arrives' },
  { icon: Truck, title: 'Nationwide shipping', text: 'Fast delivery across Bangladesh' },
  { icon: HeartHandshake, title: 'Human support', text: 'Help before and after your order' },
]

const HERO_CHIPS = [
  { label: 'Women', icon: Flower2, className: 'chip-0' },
  { label: 'Men', icon: User, className: 'chip-1' },
  { label: 'Baby & Mom', icon: Baby, className: 'chip-2' },
  { label: 'Free delivery over ৳3,000', icon: Truck, className: 'chip-3' },
]

export default function Home() {
  useTitle(null, SITE.description)
  const { products, categories, loading, error, retry } = useProducts()

  const best = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 5)
  const fresh = products.filter((product) => product.isNew).slice(0, 5)
  const women = products.filter((product) => product.aud === 'women').sort((a, b) => b.rating - a.rating).slice(0, 5)
  const men = products.filter((product) => product.aud === 'men').sort((a, b) => b.rating - a.rating).slice(0, 5)
  const baby = products.filter((product) => product.aud === 'baby').sort((a, b) => b.rating - a.rating).slice(0, 5)
  const everyone = products.filter((product) => product.aud === 'unisex').sort((a, b) => b.rating - a.rating).slice(0, 5)
  const maxOff = products.reduce((max, product) => Math.max(max, product.discount || 0), 0)

  const audienceCount = (id) => products.filter((product) => product.aud === id).length

  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> New season · Fresh arrivals
            </span>
            <h1>
              Beauty &amp; care for <em>everyone</em> in the family
            </h1>
            <p>
              Thoughtful skincare, colour, fragrance and gentle baby care — chosen for real routines and
              Bangladesh&apos;s warm, humid weather.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/skin-quiz" className="btn btn-ghost btn-lg">
                Take the Skin Quiz
              </Link>
            </div>
            <ul className="hero-points">
              <li>
                <Check size={16} /> 100% authentic
              </li>
              <li>
                <Check size={16} /> Cash on delivery
              </li>
              <li>
                <Check size={16} /> Nationwide shipping
              </li>
            </ul>
          </div>

          <div className="hero-art">
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-frame">
              <img
  className="hero-img"
  src="/images/men.png"
  alt="Lumiva male beauty model showcasing skincare products"
  width="1122"
  height="1402"
  fetchpriority="high"
  loading="eager"
  decoding="async"
/>
            </div>
            {HERO_CHIPS.map((chip) => {
              const ChipIcon = chip.icon
              return (
                <div key={chip.label} className={`hero-chip ${chip.className}`}>
                  <span className="hero-chip-icon">
                    <ChipIcon size={17} />
                  </span>
                  <span>{chip.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="why-strip container" aria-label="Why choose Lumiva">
        {WHY.map((item) => (
          <div className="why-item" key={item.title}>
            <item.icon size={20} />
            <div>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </section>

      {error && (
        <div className="container">
          <div className="api-notice" role="status">
            <div>
              <strong>Live products are temporarily offline.</strong>
              <span>{error}</span>
            </div>
            <button className="btn btn-ghost" onClick={retry}>
              Try again
            </button>
          </div>
        </div>
      )}

      <section className="section container">
        <SectionHead title="Shop for Everyone" sub="Women, men, babies and moms — all in one place" />
        <div className="aud-grid">
          {AUDIENCES.map((audience) => (
            <Link
              key={audience.id}
              to={`/shop?aud=${audience.id}`}
              className="aud-card"
              style={{ '--c': audience.color, '--on': audience.on }}
            >
              <span className="aud-icon">
                <Icon name={audience.icon} size={34} />
              </span>
              <strong>{audience.name}</strong>
              <span className="aud-link">
                {audienceCount(audience.id)} products <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHead title="Top Categories" to="/shop" cta="All Products" />
        <div className="cat-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop?cat=${category.id}`} className="cat-card">
              <span className="cat-icon">
                <Icon name={category.icon} size={28} />
              </span>
              <strong>{category.name}</strong>
              <small>{category.blurb}</small>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow
        title="Best Sellers"
        sub="Highest-rated products from our community"
        to="/shop?sort=rating"
        products={best}
        loading={loading}
      />

      <section className="section container">
        <div className="promo">
          <div>
            <span className="eyebrow light">
              <Gift size={14} /> Limited-time offers
            </span>
            <h2>Up to {maxOff}% off your favourites</h2>
            <p>Grab skincare, makeup and grooming essentials at special prices while stocks last.</p>
          </div>
          <Link to="/shop?tag=sale" className="btn btn-white btn-lg">
            View Offers <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <ProductRow
        title="New Arrivals"
        sub="Grab them before they sell out"
        to="/shop?tag=new"
        products={fresh}
        loading={loading}
      />
      <ProductRow title="For Her" sub="Colour, care and everyday glow" to="/shop?aud=women" products={women} loading={loading} />
      <ProductRow title="For Him" sub="Grooming made simple" to="/shop?aud=men" products={men} loading={loading} />
      <ProductRow title="Mom & Baby Care" sub="Gentle on sensitive skin" to="/shop?aud=baby" products={baby} loading={loading} />
      <ProductRow title="For Everyone" sub="Unisex everyday essentials" to="/shop?aud=unisex" products={everyone} loading={loading} />

      <section className="section container">
        <SectionHead title="Build Your Perfect Routine" sub="Five simple steps to healthy, glowing skin" />
        <div className="steps">
          {STEPS.map((step) => (
            <Link to={step.to} key={step.n} className="step">
              <span className="step-n">{step.n}</span>
              <strong>{step.t}</strong>
              <small>{step.d}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="seo">
          <h2>Your trusted beauty &amp; personal-care shop in Bangladesh</h2>
          <p>
            {SITE.name} brings together skincare, makeup, haircare, men&apos;s grooming, fragrance and gentle
            baby care under one roof. Whether your skin is oily, dry, combination or sensitive, you will find
            products chosen for Bangladesh&apos;s warm and humid weather — with transparent pricing, cash on
            delivery and fast nationwide shipping.
          </p>
        </div>
      </section>
    </>
  )
}
