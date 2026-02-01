'use client';

import { useState } from 'react';

// Verified local kava bars
const bars = [
  { name: 'Grassroots Kava House', address: '957 Central Ave, St. Pete', hours: '7am-12am', vibe: 'Community Hub', image: '🌿', featured: true },
  { name: 'Speakeasy Kava', address: '2101 Central Ave, St. Pete', hours: '7am-1am', vibe: 'Late Night', image: '🔮' },
  { name: 'Bula Kafe', address: '2500 5th Ave N, St. Pete', hours: '7am-10pm', vibe: 'Original', image: '🏝️', featured: true },
  { name: 'Mad Hatters Kava Bar', address: '4685 28th St N, St. Pete', hours: '24/7', vibe: 'Events', image: '🎩' },
  { name: 'Kava House Brand', address: '11141 US Hwy 19 N, Clearwater', hours: '10am-2am', vibe: 'Sports', image: '🍃' },
];

// Weekly recurring events - verified from bar websites
const events = [
  { id: 2, bar: 'Mad Hatters Kava Bar', name: 'Karaoke', day: 'Friday', date: 'Feb 7', time: '9pm', type: 'Music', image: '🎤', location: '4685 28th St N, St. Pete', description: 'Weekly karaoke with words on the big projector screen. Hosted by Michelle. Some themed nights - check social media.' },
  { id: 3, bar: 'Grassroots Kava House', name: 'Trivia Night', day: 'Thursday', date: 'Feb 6', time: '7pm', type: 'Social', image: '🧠', location: '957 Central Ave, St. Pete', description: 'Weekly trivia with prizes. Hosted by Answers R In at St. Pete\'s original kava bar.' },
  { id: 4, bar: 'Speakeasy Kava', name: 'Trivia Night', day: 'Wednesday', date: 'Feb 5', time: '7pm', type: 'Social', image: '❓', location: '2101 Central Ave, St. Pete', description: 'Weekly trivia night. Test your knowledge and win prizes. $3 kava shells all night.' },
  { id: 5, bar: 'Mad Hatters Kava Bar', name: 'Open Mic Night', day: 'Sunday', date: 'Feb 9', time: '7pm', type: 'Music', image: '🎸', location: '4685 28th St N, St. Pete', description: 'Free pool all day + Open Mic on the patio. Bring an instrument or just vibe. Free entry.' },
  { id: 6, bar: 'Grassroots Kava House', name: 'Open Mic', day: 'Sunday', date: 'Feb 9', time: '6pm', type: 'Music', image: '🎹', location: '957 Central Ave, St. Pete', description: 'Open mic night at the community hub. All styles welcome - music, poetry, comedy.' },
  { id: 7, bar: 'Kava House Brand', name: 'Karaoke Night', day: 'Saturday', date: 'Feb 8', time: '9pm', type: 'Music', image: '🎶', location: '11141 US Hwy 19 N, Clearwater', description: 'Weekly karaoke at HWY 19. Bring your friends and your best vocals.' },
  { id: 8, bar: 'Speakeasy Kava', name: 'Karaoke', day: 'Saturday', date: 'Feb 8', time: '10pm', type: 'Music', image: '🎤', location: '2101 Central Ave, St. Pete', description: 'Late night karaoke at Speakeasy Central. Host Jamicheal J. Open mic format.' },
];

// Verified weekly deals
const deals = [
  { bar: 'Mad Hatters Kava Bar', offer: '$3 Kava Shells (Unicorn & Faceplant)', code: 'WED3', expires: 'Wednesday nights' },
  { bar: 'Speakeasy Kava', offer: '$5 Bombs all night', code: 'FRI5', expires: 'Friday nights' },
  { bar: 'Grassroots Kava House', offer: '$10 Trivia = 10 games', code: 'TRIVIA10', expires: 'Thursday nights' },
  { bar: 'Bula Kafe', offer: 'Free shot with flight', code: 'BULA10', expires: 'New customers' },
];

const categories = [
  { id: 'All', label: 'All', icon: '✨' },
  { id: 'Social', label: 'Social', icon: '👥' },
  { id: 'Music', label: 'Music', icon: '🎵' },
];

const navItems = [
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'bars', label: 'Bars', icon: '🏠' },
  { id: 'deals', label: 'Deals', icon: '🎁' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState<typeof events[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.type === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.bar.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const eventTypes = ['All', 'Social', 'Music'];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-emerald-950 text-white px-4 py-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">🌿</div>
            <h1 className="text-lg font-semibold tracking-tight">KavaSpot</h1>
          </div>
          <span className="text-xs text-emerald-300 bg-emerald-900/50 px-2 py-1 rounded-full">St. Pete + Clearwater</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white px-4 py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">This Week</h2>
            <p className="text-emerald-200 text-sm">{filteredEvents.length} events • {bars.length} bars</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">Jan 31</p>
            <p className="text-emerald-200 text-xs">Saturday</p>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search events, bars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-emerald-300 text-sm focus:outline-none focus:bg-white/20"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300">🔍</span>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {eventTypes.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 py-4">
        {/* Events */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Featured */}
            {selectedCategory === 'All' && !searchQuery && filteredEvents.length > 0 && (
              <div 
                onClick={() => setShowModal(filteredEvents[0])}
                className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">⭐ Featured</span>
                  <span className="text-3xl">{filteredEvents[0].image}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{filteredEvents[0].name}</h3>
                <p className="text-emerald-100 text-sm mb-3">{filteredEvents[0].bar}</p>
                <div className="flex items-center gap-4 text-xs text-emerald-100">
                  <span>📅 {filteredEvents[0].day} @ {filteredEvents[0].time}</span>
                  <span>📍 St. Pete</span>
                </div>
              </div>
            )}

            {/* Event List */}
            <div className="space-y-3">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl mb-3 block">🔍</span>
                  <p className="text-gray-500">No events found</p>
                </div>
              ) : (
                filteredEvents.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => setShowModal(event)}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer overflow-hidden"
                  >
                    <div className="flex">
                      <div className="w-24 bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center p-3">
                        <span className="text-2xl mb-1">{event.image}</span>
                        <span className="text-xs font-semibold text-emerald-700">{event.day}</span>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {event.type}
                          </span>
                          <span className="text-xs text-gray-400">{event.time}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.bar}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(event.id); }}
                        className="p-3 flex items-start"
                      >
                        <span className={`text-lg transition-transform active:scale-125 ${favorites.includes(event.id) ? 'scale-110' : ''}`}>
                          {favorites.includes(event.id) ? '❤️' : '🤍'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Bars */}
        {activeTab === 'bars' && (
          <div className="space-y-4">
            {/* Featured Bar */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">🏆 Best of the Bay</span>
                <span className="text-3xl">🏝️</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Bula Kafe</h3>
              <p className="text-emerald-100 text-sm mb-3">2500 5th Ave N, St. Pete</p>
              <div className="flex gap-2">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">7am-10pm</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Tampa Bay's Original Kava Bar</span>
              </div>
            </div>

            {/* Bar List */}
            <div className="space-y-3">
              {bars.map((bar, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                      {bar.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{bar.name}</h3>
                      <p className="text-sm text-gray-500">{bar.address}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{bar.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deals */}
        {activeTab === 'deals' && (
          <div className="space-y-3">
            {deals.map((deal, i) => (
              <div 
                key={i} 
                className={`rounded-xl p-4 shadow-sm ${
                  i === 0 ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' : 'bg-emerald-900 text-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs opacity-80">{deal.bar}</span>
                  {i === 0 && <span className="text-lg">🔥</span>}
                </div>
                <p className="text-lg font-bold mb-2">{deal.offer}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${i === 0 ? 'text-amber-100' : 'text-emerald-300'}`}>{deal.expires}</span>
                  <code className={`px-3 py-1 rounded-lg text-sm font-mono ${i === 0 ? 'bg-white/20' : 'bg-emerald-800'}`}>{deal.code}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Newsletter */}
      <section className="px-4 py-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📬</span>
            <div>
              <h3 className="font-semibold">Weekly Digest</h3>
              <p className="text-sm text-gray-400">Curated events, every Saturday</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:bg-white/20"
            />
            <button className="bg-white text-gray-900 px-5 py-2.5 rounded-lg font-medium text-sm">Join</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-2">KavaSpot • St. Pete + Clearwater</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="text-gray-400 hover:text-emerald-700">For Bars</a>
          <a href="#" className="text-gray-400 hover:text-emerald-700">About</a>
        </div>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 pb-6 z-50 shadow-lg">
        <div className="flex justify-around">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px] rounded-xl transition-colors ${
                activeTab === item.id ? 'bg-emerald-50 text-emerald-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Event Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setShowModal(null)}
        >
          <div 
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md overflow-hidden animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-44 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="text-8xl">{showModal.image}</span>
              <button 
                onClick={() => setShowModal(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-medium text-white bg-black/20 px-2 py-0.5 rounded-full">{showModal.type}</span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{showModal.name}</h3>
              <p className="text-gray-500 mb-4">{showModal.bar}</p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{showModal.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{showModal.day}, {showModal.date}</p>
                    <p className="text-xs text-gray-500">{showModal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span>
                  <p className="text-sm text-gray-600">{showModal.location}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(showModal.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-900 text-white py-3 rounded-xl font-medium text-center text-sm"
                >
                  Add to Calendar
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText(`${showModal.name} @ ${showModal.bar}`); alert('Copied!'); }}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600"
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
