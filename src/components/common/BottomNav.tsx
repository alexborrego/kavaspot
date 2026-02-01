import { useApp } from '../../context/AppContext'
import type { TabType } from '../../types'
import { trackEvent } from '../../utils/analytics'

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp()

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    trackEvent('Tab Change', { tab })
  }

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
        onClick={() => handleTabChange('events')}
      >
        <span>📅</span>
        <span>Events</span>
      </button>
      <button
        className={`nav-btn ${activeTab === 'bars' ? 'active' : ''}`}
        onClick={() => handleTabChange('bars')}
      >
        <span>🏠</span>
        <span>Bars</span>
      </button>
      <button
        className={`nav-btn ${activeTab === 'deals' ? 'active' : ''}`}
        onClick={() => handleTabChange('deals')}
      >
        <span>🎁</span>
        <span>Deals</span>
      </button>
    </nav>
  )
}
