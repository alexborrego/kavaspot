import { FormEvent, useState } from 'react'
import { trackEvent } from '../../utils/analytics'

export const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    trackEvent('Newsletter Signup', { source: 'homepage' })
    alert(`Thanks for subscribing! You'll receive our weekly digest at ${email}`)
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <span className="newsletter-icon">📬</span>
        <div>
          <h3>Weekly Digest</h3>
          <p>Curated events, every Saturday</p>
        </div>
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
    </section>
  )
}
