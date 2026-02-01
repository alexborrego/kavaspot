-- Real Events and Deals for Bula Board
-- Generated: 2026-02-01
-- Schema-adjusted to match actual Supabase table structure

-- EVENT CATEGORIES
INSERT INTO event_categories (name, slug, icon) VALUES
('Live Music', 'live-music', '🎸'),
('Trivia', 'trivia', '🧠'),
('Open Mic', 'open-mic', '🎤'),
('Special', 'special', '⭐'),
('Community', 'community', '🤝'),
('Nightlife', 'nightlife', '🌙');

-- EVENTS (day_of_week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Open Mic Night', 'muddy-root-open-mic', 'Bring your talents! Open mic night with free kava for performers.', id, (SELECT id FROM event_categories WHERE slug = 'open-mic'), 6, '19:00', '22:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJs42kRUfjwogRYK4fDPp_-04';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Trivia Tuesday', 'muddy-root-trivia', 'Test your knowledge! Prizes for top teams.', id, (SELECT id FROM event_categories WHERE slug = 'trivia'), 2, '19:00', '21:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJs42kRUfjwogRYK4fDPp_-04';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Trivia Night', 'speakeasy-trivia', 'Weekly trivia night with great prizes!', id, (SELECT id FROM event_categories WHERE slug = 'trivia'), 3, '19:00', '21:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJjwq5GdPjwogRXbZg6X4v6bc';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Hip Hop Night', 'speakeasy-hip-hop', 'Hip hop music and vibes all night long.', id, (SELECT id FROM event_categories WHERE slug = 'live-music'), 5, '21:00', '23:59', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJjwq5GdPjwogRXbZg6X4v6bc';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Kava Tasting Night', 'khb-kava-tasting', 'Explore different kava varieties with guided tastings.', id, (SELECT id FROM event_categories WHERE slug = 'special'), 4, '18:00', '20:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Game Night', 'khb-game-night', 'Board games, consoles, and good vibes. Bring your friends!', id, (SELECT id FROM event_categories WHERE slug = 'community'), 6, '18:00', '23:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO events (name, slug, description, bar_id, event_category_id, day_of_week, start_time, end_time, is_recurring, is_active, created_at)
SELECT 'Community Game Night', 'grassroots-game-night', 'Board games, free WiFi, and dog-friendly vibes.', id, (SELECT id FROM event_categories WHERE slug = 'community'), 4, '18:00', '21:00', true, true, NOW()
FROM bars WHERE google_place_id = 'ChIJ4Z9gpoDhwogR9bVpl9Y3ffI';

-- DEALS (day_of_week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Weekday Happy Hour', 'khb-weekday-happy-hour', '15% off KHB Botanicals', 'percent', 15.0, true, ARRAY[1, 2, 3, 4, 5], '15:00', '18:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Wednesday BOGO Double Kava', 'khb-wednesday-bogo', 'Buy one, get one free double kava!', 'percent', 50.0, true, ARRAY[3], '12:00', '23:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Tuesday Tea Tuesday', 'khb-tea-tuesday', '20% off all botanical teas (all locations)', 'percent', 20.0, true, ARRAY[2], '12:00', '23:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Thursday Elixir Discount', 'khb-thursday-elixirs', '20% off elixirs', 'percent', 20.0, true, ARRAY[4], '12:00', '23:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Late Night Happy Hour', 'khb-late-night', '15% off KHB Botanicals late night', 'percent', 15.0, true, ARRAY[1], '21:00', '23:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'KHB Growler Special', 'khb-growler', 'KHB Growler fills for $23', 'fixed', 23.00, true, ARRAY[0,1,2,3,4,5,6], '12:00', '23:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJnZInGFjjwogR1WGwOBla5W0';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Monday BOGO Kava', 'muddy-root-monday-bogo', 'Buy one, get one free select kava', 'percent', 50.0, true, ARRAY[1], '12:00', '23:59', true, NOW()
FROM bars WHERE google_place_id = 'ChIJs42kRUfjwogRYK4fDPp_-04';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Double Kava Tuesday', 'muddy-root-double-kava', '$9 double kava all day', 'fixed', 9.00, true, ARRAY[2], '07:00', '23:59', true, NOW()
FROM bars WHERE google_place_id = 'ChIJs42kRUfjwogRYK4fDPp_-04';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Happy Hour', 'cozy-happy-hour', 'Happy hour specials on kava and botanicals', 'percent', 15.0, true, ARRAY[1], '16:00', '19:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJW0TWdRrjwogREKeJFMWtTRQ';

INSERT INTO deals (bar_id, name, slug, description, discount_type, discount_value, is_recurring, recurrence_days, valid_start_time, valid_end_time, is_active, created_at)
SELECT id, 'Kava Flight Special', 'grassroots-kava-flight', 'Try 3 kava varieties for the price of 2', 'percent', 33.0, true, ARRAY[5], '17:00', '20:00', true, NOW()
FROM bars WHERE google_place_id = 'ChIJ4Z9gpoDhwogR9bVpl9Y3ffI';

-- Verification queries
-- SELECT COUNT(*) FROM events;
-- SELECT COUNT(*) FROM deals;
