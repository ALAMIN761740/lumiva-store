import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'

export function SectionHead({ title, sub, to, cta = 'See All' }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {to && (
        <Link to={to} className="see-all">
          {cta} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <article className="card skel-card" aria-hidden="true">
      <div className="skel skel-media" />
      <div className="card-body">
        <span className="skel skel-line skel-xs" />
        <span className="skel skel-line skel-md" />
        <span className="skel skel-line skel-sm" />
        <span className="skel skel-line skel-price" />
        <span className="skel skel-button" />
      </div>
    </article>
  )
}

export function ProductGridSkeleton({ count = 5 }) {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}

export function ProductGrid({ products, loading = false, skeletonCount = 5 }) {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export function ProductRow({ title, sub, to, products, loading = false, skeletonCount = 5 }) {
  return (
    <section className="section container">
      <SectionHead title={title} sub={sub} to={to} />
      <ProductGrid products={products} loading={loading} skeletonCount={skeletonCount} />
    </section>
  )
}
