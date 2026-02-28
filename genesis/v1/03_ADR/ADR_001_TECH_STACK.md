# ADR-001: Seleção do Tech Stack (GroowayOS)

## Status
Accepted

## Contexto
O GroowayOS já possui uma base funcional utilizando Next.js para o frontend e agentes em Python para a inteligência. O objetivo desta v1 é consolidar e desacoplar essas peças sem causar retrabalho massivo ou quebra de funcionalidades.

## Decisão
Manteremos o stack atual, mas com padronização de comunicação:

1.  **Frontend**: Next.js (App Router) + Tailwind CSS (Manter a UI Premium).
2.  **Backend (Inteligência)**: Python (FastAPI) para orquestração de Agentes.
3.  **Banco de Dados**: Supabase (PostgreSQL) para persistência de propostas e dados de leads.
4.  **Integração**: Server Actions do Next.js para comunicar com o backend Python via REST.

## Justificativa
- **Time-to-Market**: O código atual já funciona nesses frameworks.
- **Escalabilidade**: O Supabase permite o crescimento multi-usuário (RBAC) que planejamos.
- **Especialização**: Python é a melhor escolha para lidar com LLMs e scraping complexo, enquanto Next.js oferece a melhor experiência de UI.

## Consequências
- **Positivas**: Baixa curva de aprendizado para novas features; reaproveitamento total dos agentes atuais.
- **Negativas**: Necessidade de manter dois ambientes (JS e Python) em sincronia.

---
**Próximos Passos**: Definir a estrutura de diretórios para o desacoplamento (Step 4).
