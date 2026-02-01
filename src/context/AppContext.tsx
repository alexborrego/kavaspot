import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSupabase } from '../hooks/useSupabase'
import { trackEvent } from '../utils/analytics'
import type { TabType, Bar, Event, Deal, EventCategory, BarHours } from '../types'

interface AppContextType {
  // Data
  bars: Bar[]
  events: Event[]
  deals: Deal[]
  categories: EventCategory[]
  barHours: BarHours[]
  loading: boolean
  error: string | null

  // UI State
  viewMode: 'unified' | 'tabs'
  setViewMode: (mode: 'unified' | 'tabs') => void
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  locationFilter: string
  setLocationFilter: (filter: string) => void
  dayFilter: string
  setDayFilter: (filter: string) => void

  // Modal State
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  selectedBar: Bar | null
  setSelectedBar: (bar: Bar | null) => void
  showAboutModal: boolean
  setShowAboutModal: (show: boolean) => void
  showForBarsModal: boolean
  setShowForBarsModal: (show: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { bars, events, deals, categories, barHours, loading, error } = useSupabase()

  // UI State
  const [viewMode, setViewModeState] = useState<'unified' | 'tabs'>('unified')
  const [activeTab, setActiveTabState] = useState<TabType>('events')
  const [searchQuery, setSearchQueryState] = useState('')
  const [categoryFilter, setCategoryFilterState] = useState('All')
  const [locationFilter, setLocationFilterState] = useState('All')
  const [dayFilter, setDayFilterState] = useState('All')

  // Modal State
  const [selectedEvent, setSelectedEventState] = useState<Event | null>(null)
  const [selectedBar, setSelectedBarState] = useState<Bar | null>(null)
  const [showAboutModal, setShowAboutModalState] = useState(false)
  const [showForBarsModal, setShowForBarsModalState] = useState(false)

  // Wrapped setters with analytics
  const setViewMode = (mode: 'unified' | 'tabs') => {
    setViewModeState(mode)
    trackEvent('View Mode Switch', { mode })
  }

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab)
    trackEvent('Tab Switch', { tab })
  }

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query)
    if (query.length > 2) {
      trackEvent('Search', { query_length: query.length })
    }
  }

  const setCategoryFilter = (filter: string) => {
    setCategoryFilterState(filter)
    trackEvent('Filter: Category', { category: filter })
  }

  const setLocationFilter = (filter: string) => {
    setLocationFilterState(filter)
    trackEvent('Filter: Location', { location: filter })
  }

  const setDayFilter = (filter: string) => {
    setDayFilterState(filter)
    trackEvent('Filter: Day', { day: filter })
  }

  const setSelectedEvent = (event: Event | null) => {
    setSelectedEventState(event)
    if (event) {
      trackEvent('Event Click', { event_name: event.name })
    }
  }

  const setSelectedBar = (bar: Bar | null) => {
    setSelectedBarState(bar)
    if (bar) {
      trackEvent('Bar Click', { bar_name: bar.name })
    }
  }

  const setShowAboutModal = (show: boolean) => {
    setShowAboutModalState(show)
    if (show) {
      trackEvent('Modal Open', { modal: 'About' })
    }
  }

  const setShowForBarsModal = (show: boolean) => {
    setShowForBarsModalState(show)
    if (show) {
      trackEvent('Modal Open', { modal: 'For Bars' })
    }
  }

  const value = {
    bars,
    events,
    deals,
    categories,
    barHours,
    loading,
    error,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,
    dayFilter,
    setDayFilter,
    selectedEvent,
    setSelectedEvent,
    selectedBar,
    setSelectedBar,
    showAboutModal,
    setShowAboutModal,
    showForBarsModal,
    setShowForBarsModal
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
