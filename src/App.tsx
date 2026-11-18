import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import CelebrationScreen from './components/CelebrationScreen'
import MemoryScreen from './components/MemoryScreen'

type Screen = 'welcome' | 'celebration' | 'memories'

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')

  return (
    <div className="app-shell">
      {screen === 'welcome' && <WelcomeScreen onContinue={() => setScreen('celebration')} />}
      {screen === 'celebration' && <CelebrationScreen onOpenGift={() => setScreen('memories')} />}
      {screen === 'memories' && <MemoryScreen onRestart={() => setScreen('welcome')} />}
    </div>
  )
}
