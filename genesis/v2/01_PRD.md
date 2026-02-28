# Product Requirements Document (PRD) v2.0 - GroowayOS

**Projeto**: GroowayOS
**Título**: Expansão: Automação de WhatsApp (Wave 5)
**Status**: Review
**Versão**: 2.0
**Author**: Antigravity (Genesis Engine)
**Date**: 2026-02-28

---

## 1. Executive Summary

A v2.0 do **GroowayOS** marca a evolução do sistema de uma ferramenta de diagnóstico passiva para uma plataforma de engajamento ativo. O foco principal é a integração nativa com o **WhatsApp**, permitindo que a agência dispare diagnósticos técnicos e propostas premium diretamente para o lead, gerencie cadências de follow-up e monitore o status de leitura em tempo real.

---

## 2. Goals & Non-Goals

### 2.1 Goals
- **[G1]**: Integrar um provedor de WhatsApp (Evolution API ou similar) ao OS.
- **[G2]**: Permitir o disparo manual de um diagnóstico/proposta via botão na UI.
- **[G3]**: Implementar um "Follow-up Estratégico" automático (cadência de mensagens).
- **[G4]**: Sincronizar o status da mensagem (Enviado/Entregue/Lido) no CRM.

### 2.2 Non-Goals
- **[NG1]**: Chatbot de atendimento geral (SAC). O foco é prospecção e fechamento.
- **[NG2]**: Integração com múltiplos números de WhatsApp por usuário nesta fase.

---

## 3. User Stories (The "What")

### US01: Autenticação de Instância [REQ-005]
*   **Story**: Como dono da agência, quero conectar meu WhatsApp via QR Code no sistema para que o OS possa enviar mensagens em meu nome.
*   **Acceptance Criteria (AC)**:
    *   [ ] **Given** tela de configuração, **When** solicitar nova instância, **Then** um QR Code válido deve ser exibido via API.
*   **Priority**: P0

### US02: Envio Estratégico de Diagnóstico [REQ-006]
*   **Story**: Como dono da agência, após gerar um Raio-X, quero clicar em "Enviar via WhatsApp" para que o lead receba o link premium instantaneamente.
*   **Acceptance Criteria (AC)**:
    *   [ ] **Given** diagnóstico concluído, **When** acionar disparo, **Then** o WhatsApp deve enviar o template formatado com o link rastreável.
*   **Priority**: P0

### US03: Cadência de Follow-up (Nurturing) [REQ-007]
*   **Story**: Como dono da agência, quero que o sistema envie uma mensagem de "E aí, o que achou?" 24h após o lead abrir o diagnóstico.
*   **Acceptance Criteria (AC)**:
    *   [ ] **Given** diagnóstico visualizado, **When** passar 24h sem resposta manual, **Then** o sistema deve disparar o follow-up configurado.
*   **Priority**: P1

### US04: Monitoramento de Leitura [REQ-008]
*   **Story**: Como dono da agência, quero ver no meu Dashboard de Leads se a mensagem que enviei já foi lida pelo lead.
*   **Acceptance Criteria (AC)**:
    *   [ ] **Given** mensagem enviada, **When** o webhook do WhatsApp disparar o evento 'read', **Then** o status no Supabase deve ser atualizado para 'Lido'.
*   **Priority**: P0

---

## 4. Technical Constraints
- **Queueing**: Devido aos limites do WhatsApp, o sistema deve usar uma fila para evitar disparos em massa que causem banimento (Wait loops).
- **Media**: O sistema deve suportar envio de PDFs (Proposta) e Links (Diagnóstico).

---

## 5. Success Metrics
- **Taxa de Abertura**: Leads que abrem o diagnóstico após envio via WhatsApp > 70%.
- **Recuperação de Conversas**: Leads que respondem ao follow-up automático.

---
**Aprovação**: Aguardando revisão do usuário.
