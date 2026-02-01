-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.bar_hours (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  bar_id uuid NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time time without time zone,
  close_time time without time zone,
  is_closed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bar_hours_pkey PRIMARY KEY (id),
  CONSTRAINT bar_hours_bar_id_fkey FOREIGN KEY (bar_id) REFERENCES public.bars(id)
);
CREATE TABLE public.bars (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  phone text,
  email text,
  website_url text,
  instagram_url text,
  facebook_url text,
  address_line1 text,
  address_line2 text,
  city text NOT NULL,
  state text DEFAULT 'FL'::text,
  zip_code text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  google_place_id text,
  CONSTRAINT bars_pkey PRIMARY KEY (id)
);
CREATE TABLE public.deals (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  bar_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  discount_type text,
  discount_value numeric,
  is_recurring boolean DEFAULT true,
  recurrence_days ARRAY,
  valid_start_time time without time zone,
  valid_end_time time without time zone,
  valid_start_date date,
  valid_end_date date,
  is_active boolean DEFAULT true,
  source_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT deals_pkey PRIMARY KEY (id),
  CONSTRAINT deals_bar_id_fkey FOREIGN KEY (bar_id) REFERENCES public.bars(id)
);
CREATE TABLE public.event_categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  icon text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT event_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  bar_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  event_category_id uuid,
  day_of_week integer CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time without time zone,
  end_time time without time zone,
  event_date date,
  is_recurring boolean DEFAULT false,
  is_active boolean DEFAULT true,
  source_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_bar_id_fkey FOREIGN KEY (bar_id) REFERENCES public.bars(id),
  CONSTRAINT events_event_category_id_fkey FOREIGN KEY (event_category_id) REFERENCES public.event_categories(id)
);
CREATE TABLE public.scrape_configs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  bar_id uuid NOT NULL,
  source_type text NOT NULL CHECK (source_type = ANY (ARRAY['instagram'::text, 'facebook'::text, 'website'::text, 'google_business'::text])),
  source_url text NOT NULL,
  scrape_frequency text DEFAULT 'daily'::text CHECK (scrape_frequency = ANY (ARRAY['daily'::text, 'weekly'::text])),
  css_selectors jsonb,
  last_scraped_at timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT scrape_configs_pkey PRIMARY KEY (id),
  CONSTRAINT scrape_configs_bar_id_fkey FOREIGN KEY (bar_id) REFERENCES public.bars(id)
);
CREATE TABLE public.scrape_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  scrape_config_id uuid NOT NULL,
  scraped_at timestamp with time zone DEFAULT now(),
  content_hash text,
  raw_content text,
  extracted_data jsonb,
  status text NOT NULL CHECK (status = ANY (ARRAY['success'::text, 'failed'::text, 'no_changes'::text])),
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT scrape_logs_pkey PRIMARY KEY (id),
  CONSTRAINT scrape_logs_scrape_config_id_fkey FOREIGN KEY (scrape_config_id) REFERENCES public.scrape_configs(id)
);