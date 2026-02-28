# AGENTS.md - Protocolo de Colaboração IA

> **"Se você está lendo isso, você é a Inteligência (The Intelligence)."**
> 
> Este arquivo é a sua **Âncora (Anchor)**. Ele define as leis do projeto, o mapa do território e os protocolos de memória.
> Quando você despertar (iniciar uma nova sessão), **leia este arquivo primeiro**.

---

## 🧠 Protocolo de Recuperação em 30s (Quick Recovery)

**Sempre que começar uma nova sessão ou se sentir "perdido", execute imediatamente**:

1. **Leia .agent/rules/agents.md** → Obtenha o mapa do projeto.
2. **Veja o "Estado Atual" abaixo** → Encontre a versão de arquitetura mais recente.
3. **Leia `genesis/v{N}/05_TASKS.md`** → Entenda o que está sendo construído agora.
4. **Comece a trabalhar.**

---

## 🗺️ Mapa (Percepção de Território)

Abaixo estão os caminhos e leis do projeto:

| Caminho | Descrição | Protocolo de Acesso |
|------|------|----------|
| `src/` | **Camada de Implementação**. Onde o código vive. | Leitura/Escrita via Task. |
| `genesis/` | **Histórico de Arquitetura**. Evolução versionada (v1, v2...). | **Somente Leitura**(Antigos) / **Escrita Única**(Novo). |
| `genesis/v{N}/` | **A Verdade Atual**. Definição de arquitetura mais recente. | Sempre procure a maior versão `v{N}`. |
| `.agent/workflows/` | **Workflows**. `/genesis`, `/blueprint`, etc. | Leia para entender o processo. |
| `.agent/skills/` | **Habilidades**. Ferramentas atômicas da IA. | Chame quando necessário. |

---

## 📍 Estado Atual (Mantenha via Workflow)

> **Nota**: Esta seção é mantida automaticamente pelos workflows `/genesis`, `/blueprint` e `/forge`.

- **Versão da Arquitetura**: `genesis/v2`
- **Lista de Tarefas Ativa**: `Ainda Não Criada` (Aguardando /blueprint)
- **Data da Última Edição**: `2026-02-28`

### 🌊 Wave 5 — S11: Gênese do WhatsApp
Tarefas em andamento: T11.1, T11.2, T11.3 (Genesis v2)
Versões Finalizadas: Wave 1 (Fundação), Wave 2-4 (Modularização/Hardening)

---

## 🌳 Estrutura do Projeto (Project Tree)

> **Cuidado**: Toda a raiz é mantida sob a vigência do `/genesis`.

```text
GroowayOS/
├── genesis/v2/                    # Fonte da Verdade da Arquitetura (ATUAL)
│   ├── 00_MANIFEST.md             # Visão geral da versão
│   ├── 01_PRD.md                  # Requisitos de Produto v2 (WA)
│   ├── 02_ARCHITECTURE_OVERVIEW.md # Mapa de Módulos Evolved v2
│   ├── 03_ADR/                    # Decisões Técnicas (ADR-003 WA)
│   ├── 04_SYSTEM_DESIGN/          # Desenhos detalhados (WA, API)
│   ├── 05_TASKS.md                # Gerado pelo /blueprint
│   └── 06_CHANGELOG.md            # Log de mudanças
├── src/
│   ├── features/
│   │   ├── xray/                  # Módulo de Diagnóstico Técnico
│   │   ├── proposals/             # Módulo de Proposta Premium
│   │   └── whatsapp/              # Módulo de Automação de WhatsApp [NEW]
│   ├── core/                      # Design System e Base do OS
│   └── app/                       # Roteamento Next.js (App Router)
└── intelligence/                  # Motor de Inteligência (Python Orchestrator)
```

---

## 🧭 Guia de Navegação (Navigation Guide)

- **Visão Geral**: `genesis/v2/02_ARCHITECTURE_OVERVIEW.md`
- **Requisitos de Produto**: `genesis/v2/01_PRD.md`
- **Decisões Técnicas**: `genesis/v2/03_ADR/` (ADR-003 WhatsApp Evolution)
- **Módulo X-Ray**: `src/features/xray/`
- **Módulo Proposta**: `src/features/proposals/`
- **Módulo WhatsApp**: `src/features/whatsapp/` → Design em `04_SYSTEM_DESIGN/`

---

## 🛠️ Registro de Workflows

| Comando | Quando usar? | O que produz? |
|--------|---------|------|
| `/genesis` | Novo projeto ou Refatoração profunda | PRD, Arquitetura, ADRs |
| `/scout` | Antes de mudar algo ou assumir código | `00_SCOUT_REPORT.md` |
| `/blueprint` | Após o genesis, para planejar tasks | `05_TASKS.md` |
| `/change` | Pequenos ajustes em tarefas existentes | Changelog + Update Tasks |
| `/forge` | Hora de codar (mão na massa) | Código + Conclusão de Tasks |
| `/craft` | Criar novos workflows ou skills | Novas .md em `.agent/` |

---

## 📜 Constituição (The Constitution)

1. **Versão é Lei**: Não remende documentos de arquitetura, evolua a versão.
2. **Contexto Explícito**: Decisões vão para ADRs, não para a "memória do chat".
3. **Validação Cruzada**: Antes de codar, olhe para `05_TASKS.md`. Estou fazendo o planejado?
4. **Estética**: Documentação deve ser bela. Use Emojis e Markdown rico.

---

> **Check de Status**: Pronto? Leia o documento de arquitetura guiado pelo "Estado Atual" e comece.
