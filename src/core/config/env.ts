/**
 * Centralized Environment Constants
 * Ensures single source of truth for all env variables with basic validation.
 */

function getEnv(key: string, required = true): string {
    const value = process.env[key];
    const isServer = typeof window === 'undefined';
    const isPublic = key.startsWith('NEXT_PUBLIC_');

    // Only throw if it's required AND (it's a public var OR we're on the server)
    if (required && !value && (isServer || isPublic)) {
        console.warn(`[Env Warning] Missing required environment variable: ${key}`);
        // Instead of throwing and crashing the page completely, we log a warning.
        // It's safer for production resilience.
        return '';
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
