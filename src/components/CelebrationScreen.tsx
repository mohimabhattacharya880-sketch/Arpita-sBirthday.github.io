import { useEffect, useState } from 'react'

interface CelebrationScreenProps {
  onOpenGift: () => void
}

const matrixCharacters = 'ARPITA♡HAPPYBIRTHDAY0123456789✦✧'
const matrixColors = [
  'rgba(255, 116, 164, .48)',
  'rgba(240, 83, 113, .43)',
  'rgba(196, 133, 255, .48)',
  'rgba(255, 230, 245, .62)',
]

function MatrixRain() {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.matrix-canvas')
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let columns = 0
    let drops: number[] = []
    let animationFrame = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.ceil(window.innerWidth / 28)
      drops = Array.from({ length: columns }, () => Math.random() * -40)
    }

    const draw = () => {
      context.fillStyle = 'rgba(11, 8, 17, 0.13)'
      context.fillRect(0, 0, window.innerWidth, window.innerHeight)
      context.font = '12px monospace'
      drops.forEach((drop, index) => {
        const char = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)]
        const color = matrixColors[Math.floor(Math.random() * matrixColors.length)]
        context.fillStyle = color
        context.fillText(char, index * 28, drop * 19)
        if (drop * 19 > window.innerHeight && Math.random() > 0.975) drops[index] = 0
        drops[index] += reducedMotion ? 0 : 0.35
      })
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="matrix-canvas" aria-hidden="true" />
}

export default function CelebrationScreen({ onOpenGift }: CelebrationScreenProps) {
  const [count, setCount] = useState<number | null>(3)
  const [showBirthday, setShowBirthday] = useState(false)
  const [giftReady, setGiftReady] = useState(false)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setCount(2), 1250),
      window.setTimeout(() => setCount(1), 2500),
      window.setTimeout(() => {
        setCount(null)
        setShowBirthday(true)
      }, 3750),
      window.setTimeout(() => setGiftReady(true), 5850),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [])

  return (
    <main className="celebration-screen screen screen-enter">
      <MatrixRain />
      <div className="celebration-vignette" />
      {count !== null ? (
        <div className="countdown-wrap" key={count} aria-live="polite" aria-atomic="true">
          <span className="countdown-kicker">SOMETHING MAGICAL IS ABOUT TO HAPPEN</span>
          <div className="countdown-number">{count}</div>
        </div>
      ) : (
        <section className={`birthday-reveal${showBirthday ? ' is-visible' : ''}${giftReady ? ' gift-ready' : ''}`}>
          <h1 className="birthday-title" data-text="HAPPY BIRTHDAY" aria-label="HAPPY BIRTHDAY">HAPPY BIRTHDAY</h1>
          <p className="birthday-name">DEAR ARPITA <span>♡</span></p>
          <div className="heart-stage" aria-label="A glowing heart with a birthday gift">
            <div className="glow-heart" aria-hidden="true">
              <span className="heart-core">♥</span>
              <i className="heart-ring ring-one" />
              <i className="heart-ring ring-two" />
            </div>
            {Array.from({ length: 12 }, (_, index) => (
              <span
                className="heart-particle"
                key={index}
                style={{
                  left: `${8 + index * 7}%`,
                  top: `${[25, 68, 11, 80][index % 4]}%`,
                  animationDelay: `${index * -0.3}s`,
                }}
                aria-hidden="true"
              />
            ))}
            <button className="gift-button" onClick={onOpenGift} aria-label="Open your birthday surprise">
              <span className="gift-sparkle sparkle-a">✦</span>
              <span className="gift-sparkle sparkle-b">✧</span>
              <span className="gift-box" aria-hidden="true">
                <span className="gift-box-lid" />
                <span className="gift-box-body">
                  <span className="gift-ribbon-vertical" />
                  <span className="gift-ribbon-horizontal" />
                </span>
                <span className="gift-bow"><i /><i /><b /></span>
              </span>
              <span className="gift-label">OPEN YOUR SURPRISE</span>
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
