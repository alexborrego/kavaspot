import { AppProvider, useApp } from './context/AppContext'
import { Header } from './components/common/Header'
import { HeroSection } from './components/home/HeroSection'
import { SearchBar } from './components/common/SearchBar'
import { FilterChips } from './components/common/FilterChips'
import { Loading } from './components/common/Loading'
import { Newsletter } from './components/home/Newsletter'
import { AboutModal } from './components/modals/AboutModal'
import { ForBarsModal } from './components/modals/ForBarsModal'
import { EventModal } from './components/modals/EventModal'
import { DealModal } from './components/modals/DealModal'
import { EventsTab } from './components/events/EventsTab'
import { BarsTab } from './components/bars/BarsTab'
import { DealsTab } from './components/deals/DealsTab'
import { UnifiedFeed } from './components/feed/UnifiedFeed'
import './styles/globals.css'

const AppContent = () => {
  const {
    loading,
    error,
    viewMode,
    activeTab,
    setShowForBarsModal,
    categories,
    bars,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter
  } = useApp()

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <Loading />
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <div className="empty-state">
            <span>⚠️</span>
            <p>Error loading data. Please refresh.</p>
          </div>
        </main>
      </div>
    )
  }

  // Create filter chips
  const categoryChips = [
    { label: 'All', value: 'All' },
    { label: 'Deals', value: 'Deals', icon: '💰' },
    ...categories.map(cat => ({ label: cat.name, value: cat.id, icon: cat.icon || undefined }))
  ]

  const locationChips = [
    { label: 'All Locations', value: 'All' },
    ...Array.from(new Set(bars.map(b => b.city))).map(city => ({ label: city, value: city }))
  ]

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <SearchBar />

      {/* Filter Section */}
      <div className="filters-wrapper">
        <div className="filter-row">
          <FilterChips
            chips={categoryChips}
            activeValue={categoryFilter}
            onChange={(value) => setCategoryFilter(Array.isArray(value) ? value : [value])}
            multiSelect={true}
          />
        </div>
        <div className="filter-row">
          <FilterChips
            chips={locationChips}
            activeValue={locationFilter}
            onChange={(value) => setLocationFilter(Array.isArray(value) ? value[0] : value)}
          />
        </div>
      </div>

      <main className="main">
        {viewMode === 'unified' ? (
          <UnifiedFeed />
        ) : (
          <>
            {activeTab === 'events' && <EventsTab />}
            {activeTab === 'bars' && <BarsTab />}
            {activeTab === 'deals' && <DealsTab />}
          </>
        )}
      </main>

      <Newsletter />

      <footer className="footer">
        <p>Bula Board • St. Pete</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowForBarsModal(true) }}>
            For Bars
          </a>
        </div>
      </footer>

      <AboutModal />
      <ForBarsModal />
      <EventModal />
      <DealModal />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
