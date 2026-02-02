import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { MapTab } from '../map/MapTab'

export const OnboardingModal = () => {
  const { favorites } = useApp()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding')
    if (!seen) {
      setShowOnboarding(true)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  const handleContinue = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
    trackEvent('Onboarding Complete', {
      favorites_count: favorites.length
    })
  }

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
    trackEvent('Onboarding Skipped')
  }

  // Don't render anything if onboarding is done
  if (hasSeenOnboarding && !showOnboarding) {
    return null
  }

  // Don't render if not showing
  if (!showOnboarding) {
    return null
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <div className="onboarding-logo">🌿</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Bula Board
          </h2>
          <p style={{ color: '#888', marginBottom: '1.5rem' }}>
            Select your favorite bars to get started
          </p>
        </div>

        <div className="onboarding-map">
          <MapTab />
        </div>

        <div className="onboarding-footer">
          <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '1rem' }}>
            {favorites.length} bar{favorites.length !== 1 ? 's' : ''} selected
          </p>
          <button
            className="btn-primary"
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#c45a47',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Continue to Your Board →
          </button>
          <button
            onClick={handleSkip}
            style={{
              width: '100%',
              marginTop: '0.75rem',
              padding: '0.75rem',
              background: 'transparent',
              color: '#888',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple tracking function for onboarding
const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, props ? { props } : undefined)
  }
}
