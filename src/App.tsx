import { AppProvider, useApp } from './context/AppContext'
import { Header } from './components/common/Header'
import { HeroSection } from './components/home/HeroSection'
import { SearchBar } from './components/common/SearchBar'
import { BottomNav } from './components/common/BottomNav'
import { Loading } from './components/common/Loading'
import { Newsletter } from './components/home/Newsletter'
import { AboutModal } from './components/modals/AboutModal'
import { ForBarsModal } from './components/modals/ForBarsModal'
import { EventsTab } from './components/events/EventsTab'
import { BarsTab } from './components/bars/BarsTab'
import { DealsTab } from './components/deals/DealsTab'
import './styles/globals.css'

const AppContent = () => {
  const { loading, error, activeTab, setShowForBarsModal } = useApp()

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

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <SearchBar />

      <main className="main">
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'bars' && <BarsTab />}
        {activeTab === 'deals' && <DealsTab />}
      </main>

      <Newsletter />

      <footer className="footer">
        <p>Bula Board • St. Pete + Clearwater</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowForBarsModal(true) }}>
            For Bars
          </a>
        </div>
      </footer>

      <BottomNav />
      <AboutModal />
      <ForBarsModal />
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
