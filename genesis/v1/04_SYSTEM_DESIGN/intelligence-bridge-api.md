# GroowayOS Intelligence Bridge API v1.0 📜🔌🐍

**System ID**: intelligence-bridge
**Tech Stack**: Next.js (Server Actions) <-> Python CLI (Main Orchestrator)
**Version**: 1.0

---

## 1. Overview
Este documento descreve o contrato de integração entre o frontend GroowayOS e o Motor de Inteligência Predator. Atualmente, a comunicação é síncrona via execução de Shell (CLI), com retorno assíncrono via persistência direta no Supabase.

---

## 2. Trigger de Diagnóstico (Raio-X) 🚀

### 2.1 Método de Chamada
O Next.js utiliza `child_process.spawn` para invocar o interpretador Python do Virtualenv local.

- **Caminho do Script**: `intelligence/main.py`
- **Argumentos**: Recebe um único argumento posicional contendo o JSON serializado.

### 2.2 Schema de Entrada (Request Payload)
```json
{
  "url": "string (ex: grooway.com.br)",
  "companyName": "string",
  "city": "string",
  "diagnostic_id": "uuid (opcional, para vincular a record existente)",
  "selectedAgents": [
    "tracking",
    "performance",
    "market",
    "social",
    "gmb",
    "keywords"
  ]
}
```

---

## 3. Fluxo de Execução & Orquestração 🧠

### 3.1 Agentes de Fronteira (Paralelizáveis/Sequenciais)
Dependendo do `selectedAgents`, o Motor registra:
1. `TrackingSkill`: Analisa pixels e scripts.
2. `PerformanceSkill`: Velocidade e UX bruta.
3. `MarketResearchSkill`: Inteligência competitiva.
4. `SocialMediaResearchSkill`: Auditoria de Instagram/Bio.
5. `GMBAuditorSkill`: Otimização de Google Maps.
6. `KeywordResearchSkill`: Oportunidades de SEO/Ads.

### 3.2 Agentes de Compilação (Sempre Executados)
Executados ao final para consolidar os dados dos especialistas:
1. `SeniorAnalystSkill` (**O Boss**): Gera o briefing estratégico e veredito.
2. `ValuePropositionSkill`: Gera a oferta high-ticket.
3. `CloserSkill`: Prepara os ganchos de fechamento.
4. `DesignTranslationSkill`: Formata o output para o frontend/PDF.

---

## 4. Retorno de Dados (Output) 💾

### 4.1 Persistência Direta (Supabase)
O Motor Python **não retorna o JSON via stdout** para salvar. Ele utiliza a `service_role` para atualizar a tabela `diagnostics` diretamente:

- **Tabela**: `diagnostics`
- **Operação**: `UPSERT` via `diagnostic_id`
- **Campo de Dados**: `report_data` (JSONB)

### 4.2 Formato do JSONB (`report_data`)
```json
{
  "target_url": "string",
  "company_name": "string",
  "scan_timestamp": "float",
  "final_score": "int",
  "skills_results": [
    {
      "name": "agent_name",
      "score": "int",
      "findings": "object",
      "boss_briefing": "string"
    }
  ]
}
```

---

## 5. Autenticação & Segurança 🛡️
- **Frontend -> Bridge**: Apenas Server Actions (autenticadas via NextAuth/Supabase Auth) podem disparar o spawn.
- **Bridge -> Supabase**: O Python carrega a `SUPABASE_SERVICE_ROLE_KEY` do `.env.local` para bypassar as RLS durante a escrita administrativa.

---

## 6. Tratamento de Erros & Resiliência 🏗️
- **Retentativas**: Utiliza a biblioteca `tenacity` com exponential backoff para chamadas de LLM (Gemini/OpenAI) e conexões com o banco.
- **Fail-Safe**: Se um agente de fronteira falhar, o orquestrador captura a exceção e prossegue com os outros agents para não invalidar o diagnóstico completo.

---
**Status**: CONTRATO TÉCNICO VALIDADO. ✅
