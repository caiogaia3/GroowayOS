/**
 * Centralized Environment Constants
 * Ensures single source of truth for all env variables with basic validation.
 */

function getEnv(key: string, required = true): string {
    const value = process.env[key];
    if (required && !value) {
        throw new Error(`[Env] Missing required environment variable: ${key}`);
    }
    return value || '';
}

export const ENV = {
    SUPABASE: {
        URL: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
        ANON_KEY: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    },
    AI: {
        GEMINI_KEY: getEnv('GEMINI_API_KEY'),
    },
    DEPLOYMENT: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        IS_PROD: process.env.NODE_ENV === 'production',
    }
} as const;
