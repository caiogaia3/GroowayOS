import { createClient } from '@supabase/supabase-js';
import { ENV } from '@/core/config/env';

export const supabase = createClient(
    ENV.SUPABASE.URL,
    ENV.SUPABASE.ANON_KEY
);
