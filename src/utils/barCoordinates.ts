// TODO: Clean up these coordinates with real data from Supabase
// These are placeholder estimates based on addresses
// Run this SQL in Supabase to add real coordinates:
// ALTER TABLE bars ADD COLUMN IF NOT EXISTS latitude numeric;
// ALTER TABLE bars ADD COLUMN IF NOT EXISTS longitude numeric;
// UPDATE bars SET latitude = X, longitude = Y WHERE name = 'Bar Name';

export const BAR_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // St. Petersburg bars
  'the-muddy-root-kava-cafe': { lat: 27.7703, lng: -82.6478 }, // 2250 Central Ave
  'speakeasy-central-kava-bar': { lat: 27.7703, lng: -82.6478 }, // 2101 Central Ave (approx)
  'cozy-kava': { lat: 27.7699, lng: -82.6478 }, // 2309 Central Ave (approx)
  'kava-house-brand-54th-ave': { lat: 27.8125, lng: -82.6792 }, // 2705 54th Ave N
  'grassroots-kava-house': { lat: 27.7714, lng: -82.6440 }, // 957 Central Ave
  'mad-hatters-kava-bar': { lat: 27.7985, lng: -82.7090 }, // 4685 28th Street N
  
  // Clearwater bars
  'muddy-water-kava-tea': { lat: 27.9658, lng: -82.8004 }, // 6111 10th St N
  
  // Largo bars
  'speakeasy-kava-largo': { lat: 27.9100, lng: -82.7888 }, // 12514 Starkey Rd
  
  // Default fallback for unknown bars
  'default-st-pete': { lat: 27.7731, lng: -82.6400 },
};

export const getBarCoordinates = (barSlug: string, city: string = 'St. Petersburg') => {
  // Try exact match first
  if (BAR_COORDINATES[barSlug]) {
    return BAR_COORDINATES[barSlug];
  }
  
  // Fallback based on city
  if (city.toLowerCase().includes('clearwater')) {
    return { lat: 27.9658, lng: -82.8004 };
  }
  if (city.toLowerCase().includes('largo')) {
    return { lat: 27.9100, lng: -82.7888 };
  }
  
  return BAR_COORDINATES['default-st-pete'];
};
