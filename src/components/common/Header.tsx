import { useApp } from '../../context/AppContext'

export const Header = () => {
  const { setShowAboutModal, viewMode, setViewMode } = useApp()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🌿</div>
          <h1>Bula Board</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className={`nav-btn small ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode(viewMode === 'map' ? 'unified' : 'map')}
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
