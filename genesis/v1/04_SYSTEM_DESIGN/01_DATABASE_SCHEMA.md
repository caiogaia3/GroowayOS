# 04_SYSTEM_DESIGN/01_DATABASE_SCHEMA - GroowayOS

**System ID**: database-supabase
**Project**: GroowayOS
**Version**: 1.0
**Status**: Draft
**Author**: Antigravity (Genesis)
**Date**: 2026-02-28

---

## 1. Overview
Este sistema é responsável pela persistência de toda a inteligência comercial gerada pelo GroowayOS, garantindo que diagnósticos e propostas sejam armazenados de forma estruturada no Supabase (PostgreSQL).

## 2. Data Model (Schema)

### 2.1 Entidade: Leads [REQ-001]
Armazena as empresas analisadas.
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  target_url TEXT NOT NULL,
  city TEXT,
  instagram TEXT,
  linkedin TEXT,
  status TEXT DEFAULT 'pending', -- pending, analyzed, proposal_sent
  owner_id UUID REFERENCES auth.users(id), -- Para RBAC futuro
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 Entidade: Diagnostics [REQ-001]
Armazena o relatório técnico (Raio-X).
```sql
CREATE TABLE diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  report_data JSONB NOT NULL, -- O predator_report.json completo
  final_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3 Entidade: Proposals [REQ-002, REQ-003]
Armazena as propostas geradas manualmente.
```sql
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  diagnosis_id UUID REFERENCES diagnostics(id),
  content_json JSONB NOT NULL, -- Texto e estrutura da proposta premium
  status TEXT DEFAULT 'draft', -- draft, sent, accepted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4 Entidade: Profiles (RBAC Foundation) [REQ-004]
Mapeia permissões e vínculos de agência.
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'member', -- admin, member
  agency_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. Constraints (Restrições)
- **Integridade**: `ON DELETE CASCADE` em diagnostics e proposals para evitar dados órfãos.
- **Segurança**: Row Level Security (RLS) habilitada no Supabase para que um usuário só veja leads da sua `agency_id`.

## 4. Definition of Done
- [ ] Tabelas criadas no Supabase.
- [ ] RLS Policies configuradas para `owner_id`.
- [ ] Server Actions do Next.js integradas com estas tabelas.
