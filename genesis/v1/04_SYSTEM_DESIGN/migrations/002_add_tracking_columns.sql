-- Migration 002: Add Tracking Columns
-- Created: 2026-02-28

-- Update Diagnostics Table
ALTER TABLE diagnostics 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_opened_at TIMESTAMP WITH TIME ZONE;

-- Update Proposals Table
ALTER TABLE proposals 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_opened_at TIMESTAMP WITH TIME ZONE;
