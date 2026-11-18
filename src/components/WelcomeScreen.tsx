import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

interface WelcomeScreenProps {
  onContinue: () => void
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const transitionTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isExiting) return
    const nickname = name.trim()
    if (nickname === 'অর্পিতা' || nickname.toLowerCase() === 'arpita') {
      setError(false)
      setIsExiting(true)
      transitionTimer.current = window.setTimeout(onContinue, 650)
      return
    }
    setError(true)
  }

  return (
    <main className={`welcome-screen screen${isExiting ? ' screen-exiting' : ''}`}>
      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />
      <div className="welcome-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <span className="star" key={index} />)}
      </div>
      <div className="floating-hearts" aria-hidden="true">
        {['♡', '♥', '♡', '♥', '♡', '♥', '♡'].map((heart, index) => (
          <span key={index} style={{ '--i': index } as React.CSSProperties}>{heart}</span>
        ))}
      </div>
      <section className="welcome-card glass-card" aria-labelledby="welcome-title">
        <div className="eyebrow"><span /> A little surprise awaits <span /></div>
        <div className="welcome-heart" aria-hidden="true">♡</div>
        <h1 id="welcome-title">Made just<br /><em>for you</em></h1>
        <p className="bengali-instruction" lang="bn">আপনার ডাক নামটি নিচের box এ লিখুন</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="nickname">আপনার ডাক নাম</label>
          <input
            id="nickname"
            autoComplete="off"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (error) setError(false)
            }}
            placeholder="Type your nickname"
            aria-invalid={error}
            aria-describedby={error ? 'name-error' : undefined}
          />
          {error && <p className="error-message" id="name-error" role="alert">That’s not quite it — try your special name again ♡</p>}
          <button className="primary-button" type="submit" disabled={isExiting}>Continue <span aria-hidden="true">↗</span></button>
        </form>
        <p className="welcome-footnote">A birthday moment, wrapped with love</p>
      </section>
      <div className="welcome-bottom-note">WITH LOVE, ALWAYS <span>✦</span></div>
    </main>
  )
}
