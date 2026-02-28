-- Initial Schema Migration for GroowayOS v1
-- Created: 2026-02-28

-- 1. Table: Leads (CRM)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  target_url TEXT NOT NULL,
  city TEXT,
  instagram TEXT,
  linkedin TEXT,
  status TEXT DEFAULT 'pending', -- pending, analyzed, proposal_sent
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: Diagnostics (Technical Reports)
CREATE TABLE IF NOT EXISTS diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  report_data JSONB NOT NULL,
  final_score INTEGER,
  status TEXT DEFAULT 'processing', -- processing, complete, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: Proposals (Premium Sales Docs)
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  diagnosis_id UUID REFERENCES diagnostics(id),
  content_json JSONB NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, accepted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table: Profiles (Extended User Data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'member', -- admin, member
  agency_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Draft)
-- Policy: Users can only see their own agency leads
-- CREATE POLICY "Users can see own leads" ON leads FOR SELECT USING (auth.uid() = owner_id);
