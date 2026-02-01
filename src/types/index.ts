// Database types matching the actual Supabase schema
export interface Bar {
  id: string
  name: string
  slug: string
  description: string | null
  phone: string | null
  email: string | null
  website_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  address_line1: string | null
  address_line2: string | null
  city: string
  state: string
  zip_code: string | null
  image_url: string | null
  is_active: boolean
  google_place_id: string | null
  created_at?: string
  updated_at?: string
}

export interface EventCategory {
  id: string
  name: string
  slug: string
  icon: string | null
  created_at?: string
}

export interface Event {
  id: string
  bar_id: string
  name: string
  slug: string
  description: string | null
  event_category_id: string | null  // FIXED: was category_id in old code
  day_of_week: number | null        // FIXED: was recurrence_day_of_week (0=Sunday, 6=Saturday)
  start_time: string | null         // FIXED: was recurrence_start_time
  end_time: string | null           // FIXED: was recurrence_end_time
  event_date: string | null
  is_recurring: boolean
  is_active: boolean
  source_url: string | null
  created_at?: string
  updated_at?: string
  event_categories?: EventCategory  // Joined data
}

export interface Deal {
  id: string
  bar_id: string
  name: string
  slug: string
  description: string | null
  discount_type: string | null
  discount_value: number | null
  is_recurring: boolean
  recurrence_days: number[] | null  // Array of day numbers (0-6)
  valid_start_time: string | null
  valid_end_time: string | null
  valid_start_date: string | null
  valid_end_date: string | null
  is_active: boolean
  source_url: string | null
  created_at?: string
  updated_at?: string
}

export interface BarHours {
  id: string
  bar_id: string
  day_of_week: number  // 0-6 (Sunday-Saturday)
  open_time: string | null
  close_time: string | null
  is_closed: boolean
  created_at?: string
  updated_at?: string
}

// App state types
export type TabType = 'events' | 'bars' | 'deals'

export interface AppState {
  bars: Bar[]
  events: Event[]
  deals: Deal[]
  categories: EventCategory[]
  barHours: BarHours[]
  loading: boolean
  error: string | null
  activeTab: TabType
  searchQuery: string
  categoryFilter: string
  locationFilter: string
  dayFilter: string
}
