import { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'

export const OnboardingModal = () => {
  const { favorites, setFavorites, bars, setShowFavoritesOnly, showOnboarding, setShowOnboarding } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  // Don't render if not showing
  if (!showOnboarding) {
    return null
  }

  // Close modal and save to localStorage
  const handleContinue = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
    // Only enable favorites-only mode if favorites were selected
    if (favorites.length > 0) {
      setShowFavoritesOnly(true)
    }
    trackEvent('Onboarding Complete', {
      favorites_count: favorites.length
    })
  }

  // Close modal without enabling favorites mode
  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
    trackEvent('Onboarding Skipped')
  }

  const toggleFavorite = (barId: string) => {
    const newFavorites = favorites.includes(barId)
      ? favorites.filter(id => id !== barId)
      : [...favorites, barId]
    
    setFavorites(newFavorites)
    localStorage.setItem('favoriteBars', JSON.stringify(newFavorites))
    
    const bar = bars.find(b => b.id === barId)
    trackEvent('Toggle Favorite', {
      bar_name: bar?.name || 'Unknown',
      action: newFavorites.includes(barId) ? 'add' : 'remove'
    })
  }

  // Filter and sort bars
  const filteredBars = useMemo(() => {
    const allBars = bars.map(bar => ({
      bar,
      isFavorite: favorites.includes(bar.id)
    }))

    // Filter by search
    const filtered = searchQuery
      ? allBars.filter(({ bar }) => 
          bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bar.city?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allBars

    // Sort: favorites first, then alphabetical
    return filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1
      if (!a.isFavorite && b.isFavorite) return 1
      return a.bar.name.localeCompare(b.bar.name)
    })
  }, [bars, favorites, searchQuery])

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Bula Board
          </h2>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            Select your favorite bars to get started
          </p>
          
          <div className="search-bar" style={{ marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search bars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
        </div>

        <div className="onboarding-list" style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '0 1.5rem',
          maxHeight: '50vh'
        }}>
          {filteredBars.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
              No bars found
            </p>
          ) : (
            filteredBars.map(({ bar, isFavorite }) => (
              <div
                key={bar.id}
                className={`bar-select-item ${isFavorite ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(bar.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                  background: isFavorite ? '#fef3f0' : 'transparent',
                  border: `1px solid ${isFavorite ? '#c45a47' : '#f0e6e3'}`
                }}
              >
                <div 
                  className="bar-marker"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isFavorite ? '#c45a47' : '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    flexShrink: 0
                  }}
                >
                  {isFavorite ? '★' : '☆'}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontFamily: 'Playfair Display', 
                    fontWeight: 600, 
                    marginBottom: '0.125rem',
                    fontSize: '0.9375rem'
                  }}>
                    {bar.name}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#888' }}>
                    {bar.city || 'St. Pete'} • {bar.address_line1 || ''}
                  </p>
                </div>
                <div 
                  className="select-indicator"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${isFavorite ? '#c45a47' : '#ddd'}`,
                    background: isFavorite ? '#c45a47' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isFavorite && (
                    <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="onboarding-footer">
          <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '1rem', textAlign: 'center' }}>
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
