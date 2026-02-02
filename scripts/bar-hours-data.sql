-- Add bar hours for kava bars in St. Pete
-- Run this in Supabase SQL Editor to populate hours

-- The Muddy Root Kava Cafe (2250 Central Ave)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '07:00', '02:00', false FROM bars WHERE name LIKE '%Muddy Root%' AND city LIKE '%St. Pete%';

-- Speakeasy Central Kava Bar
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '07:00', '01:00', false FROM bars WHERE name LIKE '%Speakeasy%' AND city LIKE '%St. Pete%';

-- Cozy Kava
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '10:00', '22:00', false FROM bars WHERE name LIKE '%Cozy Kava%';

-- Kava House Brand (54th Ave)
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '10:00', '22:00', false FROM bars WHERE name LIKE '%Kava House%' AND city LIKE '%St. Pete%';

-- Grassroots Kava House
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '08:00', '22:00', false FROM bars WHERE name LIKE '%Grassroots%';

-- Mad Hatters Kava Bar
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 0, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 1, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 2, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 3, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 4, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 5, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';
INSERT INTO bar_hours (bar_id, day_of_week, open_time, close_time, is_closed) 
SELECT id, 6, '11:00', '22:00', false FROM bars WHERE name LIKE '%Mad Hatter%';

-- Verify
-- SELECT COUNT(*) FROM bar_hours;
