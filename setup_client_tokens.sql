-- =====================================================================================
-- Migration: Create Client API Tokens Table (Security Hardening)
-- Description: This table securely stores individual client access tokens for Meta/Google Ads.
-- Requires: Supabase SQL Editor execution.
-- =====================================================================================

-- 1. Create the table for storing client integration tokens
CREATE TABLE IF NOT EXISTS public.client_api_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL, -- Assuming you have a clients table, link this to the client's UUID
    platform TEXT NOT NULL CHECK (platform IN ('meta_ads', 'google_ads', 'google_sheets')),
    -- We recommend using Supabase Vault in the future for `access_token`, but for now, we use a TEXT field.
    -- Ensure the frontend NEVER queries this table directly.
    access_token TEXT NOT NULL, 
    refresh_token TEXT,
    account_id TEXT, -- E.g., 'act_12345' for Meta or '123-456-7890' for Google Ads
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Ensure one platform per client
    UNIQUE (client_id, platform)
);

-- 2. Enable Row Level Security (RLS)
-- This is CRITICAL. It ensures that tokens cannot be read by unauthorized users.
ALTER TABLE public.client_api_tokens ENABLE ROW LEVEL SECURITY;

-- 3. Define RLS Policies
-- Policy: Only authenticated server-side functions (Service Roles) or the specific user who owns the client can read the tokens.
-- Assuming there's a way to associate the `auth.uid()` with the `client_id` (this logic might need adjustment based on your exact schema).
-- If only internal system functions need to read this (which is what we want for server actions), we can keep policies strict.

-- Allow Service Role full access (internal APIs bypassing RLS)
-- Since server actions use the Service Role key or execute on the server, they bypass RLS naturally if configured correctly.

-- Policy: Restrict public access completely. FRONTEND SHOULD NOT READ THIS.
CREATE POLICY "Deny direct frontend read access to tokens"
ON public.client_api_tokens
FOR SELECT
TO authenticated, anon
USING (false); -- Nobody from the frontend can read the tokens directly

-- 4. Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_client_tokens_client_id ON public.client_api_tokens(client_id);
CREATE INDEX IF NOT EXISTS idx_client_tokens_platform ON public.client_api_tokens(platform);

-- =====================================================================================
-- NEXT STEPS:
-- Go to your Supabase Dashboard -> SQL Editor -> New Query.
-- Paste this entire script and click "RUN".
-- =====================================================================================
