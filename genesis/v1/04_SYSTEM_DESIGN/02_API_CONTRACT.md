# 04_SYSTEM_DESIGN/02_API_CONTRACT - GroowayOS

**System ID**: api-next-python
**Project**: GroowayOS
**Version**: 1.0
**Status**: Draft
**Author**: Antigravity (Genesis)
**Date**: 2026-02-28

---

## 1. Overview
Define o contrato de interface entre o Gerenciador de UI (Next.js) e o Motor de Inteligência (Python).

## 2. API Design [REQ-001, REQ-002]

### 2.1 Início de Diagnóstico (Trigged by Next.js)
**Método**: Shell Execution (Current) / Future: REST API.
**Entrada (JSON)**:
```json
{
  "url": "https://empresa.com",
  "companyName": "Empresa X",
  "city": "Sao Paulo",
  "selectedAgents": ["gmb", "seo", "ads"]
}
```

### 2.2 Retorno do Diagnóstico (Output de Python)
**Formato**: `predator_report.json`.
**Estrutura Vital**:
```json
{
  "target_url": "string",
  "company_name": "string",
  "scan_timestamp": "float",
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

### 2.3 Trigger de Proposta Premium (Next.js -> Python Alchemist)
**Objetivo**: Gerar texto persuasivo baseado em um `lead_id` e seu respectivo diagnóstico.
**Fluxo**:
1. Next.js busca diagnóstico no Supabase.
2. Next.js envia JSON do diagnóstico para o Agent Python "Alquimista".
3. Python retorna JSON da proposta estruturada.

## 3. Trade-offs
- **Shell vs REST**: Atualmente usamos shell local para velocidade de MVP. No futuro, moveremos o Python para um serviço independente (FastAPI) via HTTP para escalabilidade.

---
**Aprovação**: Aguardando revisão do arquiteto.
