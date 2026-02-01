import { useApp } from '../../context/AppContext'
import { trackEvent } from '../../utils/analytics'

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, activeTab } = useApp()

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.length >= 2) {
      trackEvent('Search', { query: value.substring(0, 50), tab: activeTab })
    }
  }

  return (
    <div className="search-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search events, bars, deals..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
