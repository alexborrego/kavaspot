-- Add missing columns to bars table for Google Places integration
ALTER TABLE bars ADD COLUMN IF NOT EXISTS google_place_id TEXT;
ALTER TABLE bars ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE bars ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- After running this, copy and run the INSERT statements from:
-- scripts/kava-bars-sql-output.sql
