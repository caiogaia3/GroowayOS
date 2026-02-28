# 00_SCOUT_REPORT - GroowayOS v1

**Data**: 2026-02-28
**Status**: CRITICAL (Fragmentation detected)

## 1. System Fingerprint (Raio-X)
O projeto encontra-se em um estado de **"Split-Brain"** (Cérebro Dividido). Existem duas estruturas paralelas de Next.js tentando coexistir.

- **Root (Active Target)**: Onde as Waves 3 e 4 foram implementadas. Estrutura limpa, mas incompleta.
- **`raio-x-digital/` (Legacy/Resource Pool)**: Contém a implementação original completa, incluindo o motor Python.

### Estrutura Lógica:
- **Frontend**: Next.js (Root + `raio-x-digital/src`)
- **Backend**: Python Agents (`raio-x-digital/python_agent`)
- **DB**: Supabase

---

## 2. Build & Runtime Topology
### Build Risks:
- **Duplicação de `package.json`**: Risco iminente de incompatibilidade de versões entre o Root e a subpasta.
- **Configuração Redundante**: `next.config.ts` e `tsconfig.json` replicados.

### Runtime Risks:
- **Trigger Fraco**: A comunicação Frontend -> Python ocorre via `spawn` de processo CLI. Não há monitoramento de PIDs ou recuperação de falhas caso o processo Python trave.
- **Drift de Schema**: O JSON enviado pelo Node.js pode divergir do esperado pelo Python sem aviso prévio (falta de validação Pydantic/Zod compartilhada).

---

## 3. Temporal Topology (Hotspots)
Com base no histórico do Git:
- **🔥 AuditorPage**: O arquivo `src/app/(os)/auditor/page.tsx` é o ponto de maior Churn. Quase todas as features convergem para ele, criando um "God Component" perigoso.
- **🔥 Python Agents**: Grande volume de modificações em `skill_senior_analyst.py`, indicando que a lógica do "Boss" está em constante refinamento.

---

## 4. Gap Analysis (Planejado vs Real)
| Conceito | Planejado (Genesis) | Realidade (Código) | Status |
| :--- | :--- | :--- | :--- |
| Modularidade | Feature-based (`/features`) | Espalhado entre Root e Subpastas | ⚠️ GAPS |
| Persistência | Supabase Direct | Python e React gravam no DB | ✅ OK |
| Automação | Trigger Automático | Implementado via CLI Spawn | ✅ OK |

---

## 5. Risk Matrix & Recomendações
1.  **RECOMENDAÇÃO PRIORITÁRIA**: Unificar os repositórios. Mover o conteúdo vital de `raio-x-digital` para a raiz e deletar a pasta duplicada.
2.  **RECOMENDAÇÃO TÉCNICA**: Implementar uma fila de tarefas (ex: Inngest ou BullMQ) para substituir o `spawn` de processos locais, visando escalabilidade.
3.  **RECOMENDAÇÃO DE DESIGN**: Quebrar a `AuditorPage` em widgets menores para reduzir o risco de Churn.

---
**Assinado**: Scout Agent 2.0
