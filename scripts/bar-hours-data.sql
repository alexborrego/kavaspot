-- Add bar hours for kava bars using exact slug matching
-- Run this in Supabase SQL Editor to populate hours
-- Using slugs to avoid duplicate key issues

-- First clear any existing hours (if re-running)
-- DELETE FROM bar_hours;

-- The Muddy Root Kava Cafe (slug: the-muddy-root-kava-cafe)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '07:00', '02:00', false FROM bars WHERE slug = 'the-muddy-root-kava-cafe';

-- Speakeasy Central Kava Bar (slug: speakeasy-central-kava-bar)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '07:00', '01:00', false FROM bars WHERE slug = 'speakeasy-central-kava-bar';

-- Cozy Kava (slug: cozy-kava)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '10:00', '22:00', false FROM bars WHERE slug = 'cozy-kava';

-- Kava House Brand 54th Ave (slug: kava-house-brand-54th-ave)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '10:00', '22:00', false FROM bars WHERE slug = 'kava-house-brand-54th-ave';

-- Grassroots Kava House (slug: grassroots-kava-house)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '08:00', '22:00', false FROM bars WHERE slug = 'grassroots-kava-house';

-- Mad Hatters Kava Bar (slug: mad-hatters-kava-bar)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '11:00', '22:00', false FROM bars WHERE slug = 'mad-hatters-kava-bar';

-- Verify
-- SELECT COUNT(*) as total_hours FROM bar_hours;
-- SELECT b.name, COUNT(h.id) as hours_count FROM bars b LEFT JOIN bar_hours h ON b.id = h.bar_id GROUP BY b.name ORDER BY b.name;
