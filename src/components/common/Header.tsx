import { useApp } from '../../context/AppContext'

export const Header = () => {
  const { setShowAboutModal, setViewMode, favorites, showFavoritesOnly, setShowFavoritesOnly } = useApp()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🌿</div>
          <h1>Bula Board</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {favorites.length > 0 && (
            <button
              className={`nav-btn small ${showFavoritesOnly ? 'active' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{ 
                minWidth: 'auto', 
                padding: '0.5rem 0.75rem',
                background: showFavoritesOnly ? '#fef3f0' : undefined
              }}
              aria-label="Favorites Only"
              title={showFavoritesOnly ? 'Show all bars' : 'Show only favorites'}
            >
              {showFavoritesOnly ? '★' : '☆'}
            </button>
          )}
          <button
            className="nav-btn small"
            onClick={() => setViewMode('map')}
            style={{ minWidth: 'auto', padding: '0.5rem 0.75rem' }}
            aria-label="Map View"
          >
            🗺️
          </button>
          <button
            className="nav-btn small"
            onClick={() => setShowAboutModal(true)}
            aria-label="About"
          >
            ?
          </button>
        </div>
      </div>
    </header>
  )
}
