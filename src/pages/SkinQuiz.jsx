import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductGrid } from '../components/Section'
import { useProducts } from '../context/ProductContext'
import useTitle from '../hooks/useTitle'

const QUESTIONS = [
  {
    key: 'type',
    q: 'What is your skin type?',
    options: [
      ['oily', 'Oily'],
      ['dry', 'Dry'],
      ['combo', 'Combination'],
      ['sensitive', 'Sensitive'],
    ],
  },
  {
    key: 'concern',
    q: 'What is your main concern?',
    options: [
      ['acne', 'Acne & breakouts'],
      ['spots', 'Dark spots & dullness'],
      ['hydration', 'Dryness & hydration'],
      ['aging', 'Fine lines & ageing'],
      ['sun', 'Sun protection'],
    ],
  },
]

export default function SkinQuiz() {
  useTitle('Skin Quiz', 'Answer two quick questions and get product suggestions for your skin type and concern.')
  const { products } = useProducts()
  const [step, setStep] = useState(0)
  const [a, setA] = useState({})

  const done = step >= QUESTIONS.length
  const pick = (key, val) => {
    setA({ ...a, [key]: val })
    setStep(step + 1)
  }

  const picks = () => {
    const skin = products.filter((p) => p.cat === 'skin-care' || p.cat === 'mens-grooming')
    const byConcern = skin.filter((p) => p.tags.includes(a.concern))
    const byType = a.type === 'sensitive' ? skin.filter((p) => p.tags.includes('sensitive')) : []
    const sun = skin.filter((p) => p.tags.includes('sunscreen'))
    const cleanser = skin.filter((p) => p.tags.includes('cleanser'))
    const seen = new Set()
    return [...byConcern, ...byType, ...cleanser, ...sun]
      .filter((p) => (seen.has(p.id) ? false : seen.add(p.id)))
      .slice(0, 8)
  }

  return (
    <div className="container page narrow">
      <h1 className="page-title">Find Your Routine</h1>
      {!done ? (
        <div className="panel quiz">
          <div className="quiz-progress"><span style={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
          <small className="muted">Question {step + 1} of {QUESTIONS.length}</small>
          <h2>{QUESTIONS[step].q}</h2>
          <div className="quiz-opts">
            {QUESTIONS[step].options.map(([v, l]) => (
              <button key={v} className="quiz-opt" onClick={() => pick(QUESTIONS[step].key, v)}>{l}</button>
            ))}
          </div>
          {step > 0 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
        </div>
      ) : (
        <>
          <div className="panel">
            <h2>Recommended for you</h2>
            <p className="muted">Based on your answers. This is general guidance, not medical advice — patch-test new products and see a dermatologist for persistent skin problems.</p>
          </div>
          <ProductGrid products={picks()} />
          <div className="center">
            <button className="btn btn-ghost btn-lg" onClick={() => { setStep(0); setA({}) }}>Retake quiz</button>{' '}
            <Link to="/shop" className="btn btn-primary btn-lg">Browse all</Link>
          </div>
        </>
      )}
    </div>
  )
}
