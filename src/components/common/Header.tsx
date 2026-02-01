import { useApp } from '../../context/AppContext'

export const Header = () => {
  const { setShowAboutModal } = useApp()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🌿</div>
          <h1>Bula Board</h1>
        </div>
        <button
          className="nav-btn small"
          onClick={() => setShowAboutModal(true)}
          aria-label="About"
        >
          ?
        </button>
      </div>
    </header>
  )
}
