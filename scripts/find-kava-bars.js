/**
 * Google Places API Script to Find Kava Bars
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const LOCATIONS = [
  { name: 'St. Petersburg', lat: 27.7731, lng: -82.6400 },
  { name: 'Clearwater', lat: 27.9659, lng: -82.8001 },
  { name: 'Largo', lat: 27.9092, lng: -82.7873 },
];

function searchPlaces(query) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      textQuery: query,
      maxResultCount: 20,
    });

    const options = {
      hostname: 'places.googleapis.com',
      path: '/v1/places:searchText',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': '*',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            console.error(`  Error: ${json.error.message}`);
            resolve([]);
          } else {
            resolve(json.places || []);
          }
        } catch (e) {
          resolve([]);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`  Error: ${e.message}`);
      resolve([]);
    });

    req.write(postData);
    req.end();
  });
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractAddress(addressComponents) {
  let street = '', city = '', state = 'FL', zip = '';
  
  if (!addressComponents) return { address_line1: '', city: '', state: 'FL', zip: '' };
  
  for (const component of addressComponents) {
    if (component.types.includes('street_number')) street = component.longText + ' ' + street;
    if (component.types.includes('route')) street += component.longText;
    if (component.types.includes('locality')) city = component.longText;
    if (component.types.includes('administrative_area_level_1')) state = component.shortText;
    if (component.types.includes('postal_code')) zip = component.longText;
  }
  
  return { address_line1: street.trim(), city, state, zip };
}

function generateBarSQL(place, searchLocation) {
  const address = extractAddress(place.addressComponents);
  const slug = generateSlug(place.displayName?.text);
  
  return `
-- ${place.displayName?.text}
INSERT INTO bars (name, slug, description, phone, address_line1, city, state, zip_code, website_url, google_place_id, is_active)
VALUES (
  '${place.displayName?.text?.replace(/'/g, "''") || 'Unknown'}',
  '${slug}',
  'Kava bar in ${searchLocation}',
  '${place.phoneNumber || ''}',
  '${(address.address_line1 || place.formattedAddress?.split(',')[0] || '').replace(/'/g, "''")}',
  '${(address.city || searchLocation).replace(/'/g, "''")}',
  '${address.state || 'FL'}',
  '${address.zip_code || ''}',
  '${place.websiteUri || ''}',
  '${place.id}',
  true
);`;
}

function generateHoursSQL(placeName, placeId, openingHours) {
  if (!openingHours?.periods || !openingHours.periods.length) return '';
  
  let sql = `-- ${placeName} hours\n`;
  
  for (const period of openingHours.periods) {
    if (!period.open?.time) continue;
    const day = period.open.day;
    const openTime = period.open.time;
    const closeTime = period.close?.time;
    
    const openFormatted = `${openTime.slice(0, 2)}:${openTime.slice(2)}`;
    const closeFormatted = closeTime ? `${closeTime.slice(0, 2)}:${closeTime.slice(2)}` : '23:59';
    
    sql += `INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) ` +
           `VALUES ((SELECT id FROM bars WHERE google_place_id = '${placeId}'), ${day}, '${openFormatted}', '${closeFormatted}', false);\n`;
  }
  
  return sql;
}

async function main() {
  console.log('🔍 Searching for kava bars in Tampa Bay...\n');

  const allPlaces = new Map();
  const queries = ['kava bar', 'kava lounge', 'botanical bar'];

  for (const location of LOCATIONS) {
    console.log(`📍 ${location.name}...`);
    
    for (const query of queries) {
      const places = await searchPlaces(`${query} ${location.name}`);
      for (const place of places) {
        if (!allPlaces.has(place.id)) {
          allPlaces.set(place.id, { ...place, searchLocation: location.name });
        }
      }
    }
    console.log(`  Found ${allPlaces.size} places`);
  }

  console.log(`\n📊 Total: ${allPlaces.size} unique places\n`);

  if (allPlaces.size === 0) {
    console.log('No places found.');
    return;
  }

  console.log('========================================');
  console.log('SQL OUTPUT');
  console.log('========================================\n');

  console.log('-- BARS');
  for (const [id, place] of allPlaces) {
    console.log(generateBarSQL(place, place.searchLocation));
    console.log('');
  }

  console.log('-- HOURS');
  for (const [id, place] of allPlaces) {
    if (place.regularOpeningHours?.periods) {
      console.log(generateHoursSQL(place.displayName?.text, place.id, place.regularOpeningHours));
      console.log('');
    }
  }

  // Save to file
  let sql = '-- KAVA BARS FROM GOOGLE PLACES API\n';
  sql += `-- Generated: ${new Date().toISOString()}\n\n`;
  
  sql += '-- BARS\n';
  for (const [id, place] of allPlaces) {
    sql += generateBarSQL(place, place.searchLocation) + '\n';
  }
  
  sql += '\n-- HOURS\n';
  for (const [id, place] of allPlaces) {
    if (place.regularOpeningHours?.periods) {
      sql += generateHoursSQL(place.displayName?.text, place.id, place.regularOpeningHours) + '\n';
    }
  }

  fs.writeFileSync('scripts/kava-bars-sql-output.sql', sql);
  console.log('💾 Saved to scripts/kava-bars-sql-output.sql');
}

main().catch(console.error);
