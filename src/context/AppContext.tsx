import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSupabase } from '../hooks/useSupabase'
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
  const [activeTab, setActiveTab] = useState<TabType>('events')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [dayFilter, setDayFilter] = useState('All')

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showForBarsModal, setShowForBarsModal] = useState(false)

  const value = {
    bars,
    events,
    deals,
    categories,
    barHours,
    loading,
    error,
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
