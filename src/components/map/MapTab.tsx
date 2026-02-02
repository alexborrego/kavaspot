import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { trackEvent } from '../../utils/analytics'
import { getBarCoordinates } from '../../utils/barCoordinates'
import type { Bar } from '../../types'

export const MapTab = () => {
  const { bars, setSelectedBar, favorites, setFavorites } = useApp()
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedBarId, setSelectedBarId] = useState<string | null>(null)

  // St. Petersburg center
  const CENTER = [27.7731, -82.6400] as [number, number]

  useEffect(() => {
    if (!mapRef.current || mapLoaded) return

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (!mapRef.current) return

      // Create map
      const map = L.default.map(mapRef.current).setView(CENTER, 13)

      // Add tile layer (OpenStreetMap)
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      // Add markers for each bar
      bars.forEach((bar) => {
        const coords = getBarCoordinates(bar.slug, bar.city)
        
        const isFavorite = favorites.includes(bar.id)
        const marker = L.default.circleMarker([coords.lat, coords.lng], {
          radius: isFavorite ? 14 : 10,
          fillColor: isFavorite ? '#c45a47' : '#888',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(map)

        marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <strong>${bar.name}</strong><br/>
            <span style="color: #888;">${bar.city || 'St. Pete'}</span><br/>
            <button 
              id="fav-${bar.id}"
              style="
                margin-top: 8px;
                padding: 6px 12px;
                background: ${isFavorite ? '#c45a47' : '#f0f0f0'};
                color: ${isFavorite ? '#fff' : '#333'};
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
              "
            >
              ${isFavorite ? '★ Following' : '☆ Follow'}
            </button>
          </div>
        `)

        marker.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`fav-${bar.id}`)
            if (btn) {
              btn.onclick = () => toggleFavorite(bar.id)
            }
          }, 100)
        })
      })

      leafletMapRef.current = map
      setMapLoaded(true)
    })
  }, [bars, mapLoaded])

  const toggleFavorite = (barId: string) => {
    const newFavorites = favorites.includes(barId)
      ? favorites.filter(id => id !== barId)
      : [...favorites, barId]
    
    setFavorites(newFavorites)
    localStorage.setItem('favoriteBars', JSON.stringify(newFavorites))
    
    const bar = bars.find(b => b.id === barId)
    trackEvent('Toggle Favorite', {
      bar_name: bar?.name || 'Unknown',
      action: newFavorites.includes(barId) ? 'add' : 'remove'
    })
  }

  const handleBarSelect = (bar: Bar) => {
    setSelectedBarId(bar.id)
    setSelectedBar(bar)
    trackEvent('Map: Bar Selected', { bar_name: bar.name })
  }

  return (
    <div className="map-container map-full-width">
      <div className="map-sidebar">
        <h3 style={{ marginBottom: '1rem', fontFamily: 'Playfair Display' }}>
          {favorites.length > 0 ? 'Your Favorites' : 'All Bars'}
        </h3>
        
        {favorites.length === 0 && (
          <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '1rem' }}>
            Tap bars on the map to follow them and see their events & deals here.
          </p>
        )}

        <div className="bar-list">
          {(favorites.length > 0 ? bars.filter(b => favorites.includes(b.id)) : bars).map(bar => (
            <div
              key={bar.id}
              className={`bar-card-mini ${selectedBarId === bar.id ? 'selected' : ''}`}
              onClick={() => handleBarSelect(bar)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {bar.name}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#888' }}>
                    {bar.city || 'St. Pete'}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(bar.id)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    color: favorites.includes(bar.id) ? '#c45a47' : '#ccc'
                  }}
                >
                  {favorites.includes(bar.id) ? '★' : '☆'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div ref={mapRef} className="map-view map-expand" />
    </div>
  )
}
