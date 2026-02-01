import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Bar, Event, Deal, EventCategory, BarHours } from '../types'

interface UseSupabaseReturn {
  bars: Bar[]
  events: Event[]
  deals: Deal[]
  categories: EventCategory[]
  barHours: BarHours[]
  loading: boolean
  error: string | null
}

export const useSupabase = (): UseSupabaseReturn => {
  const [bars, setBars] = useState<Bar[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [categories, setCategories] = useState<EventCategory[]>([])
  const [barHours, setBarHours] = useState<BarHours[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch all data in parallel with CORRECTED field names
        const [
          { data: barsData, error: barsError },
          { data: eventsData, error: eventsError },
          { data: dealsData, error: dealsError },
          { data: categoriesData, error: categoriesError },
          { data: hoursData, error: hoursError }
        ] = await Promise.all([
          supabase
            .from('bars')
            .select('*')
            .eq('is_active', true)
            .eq('state', 'FL')
            .order('name'),

          // FIXED: Using correct field names - event_category_id, day_of_week, start_time, end_time
          supabase
            .from('events')
            .select('*, event_categories(*)')
            .eq('is_active', true)
            .order('name'),

          supabase
            .from('deals')
            .select('*')
            .eq('is_active', true)
            .order('name'),

          supabase
            .from('event_categories')
            .select('*')
            .order('name'),

          supabase
            .from('bar_hours')
            .select('*')
        ])

        if (barsError) throw barsError
        if (eventsError) throw eventsError
        if (dealsError) throw dealsError
        if (categoriesError) throw categoriesError
        if (hoursError) throw hoursError

        setBars(barsData || [])
        setEvents(eventsData || [])
        setDeals(dealsData || [])
        setCategories(categoriesData || [])
        setBarHours(hoursData || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { bars, events, deals, categories, barHours, loading, error }
}
