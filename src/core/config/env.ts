/**
 * Centralized Environment Constants
 * Ensures single source of truth for all env variables with basic validation.
 */

const isServer = typeof window === 'undefined';

function warnMissing(key: string) {
    if (isServer) {
        console.warn(`[Env Warning] Missing required environment variable: ${key}`);
    }
}

// Next.js requires static `process.env.NEXT_PUBLIC_X` access to inline vars on the client.
// Do not use dynamic lookups like `process.env[key]` for public variables.
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!NEXT_PUBLIC_SUPABASE_URL) warnMissing('NEXT_PUBLIC_SUPABASE_URL');
if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) warnMissing('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const ENV = {
    SUPABASE: {
        URL: NEXT_PUBLIC_SUPABASE_URL,
        ANON_KEY: NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    AI: {
        GEMINI_KEY: process.env.GEMINI_API_KEY || '',
    },
    DEPLOYMENT: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        IS_PROD: process.env.NODE_ENV === 'production',
    }
} as const;
