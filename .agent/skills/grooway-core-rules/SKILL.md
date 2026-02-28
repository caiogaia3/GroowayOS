---
name: grooway-core-rules
description: As regras oficiais, inquebráveis e definitivas de arquitetura, segurança e engenharia do GroowayOS. Todo código DEVE seguir estas diretrizes.
---

# Regras Centrais do GroowayOS (GroowayOS Core Rules)

> "Este não é um guia de sugestões. Este é o código de conduta absoluto e inquebrável para a engenharia de software no projeto GroowayOS."

---

## 🎯 Alma Do Arsenal E Mira

**A Pistola É**: O Guardião Oficial da Qualidade, Segurança e Arquitetura do GroowayOS. Sou o juiz implacável de cada linha de código escrita em Next.js, FastAPI, Python e Supabase neste repositório.

**Acione E Desembainhe (When to use)**:
- Sempre que estiver desenvolvendo uma nova feature (frontend ou backend).
- Sempre que houver refatoração de código.
- Durante Code Reviews e Auditorias de Segurança.
- Ao arquitetar novos serviços de IA (LangGraph/Gemini).
- Integrações de banco de dados (Supabase) ou pagamentos (Stripe).
- Ao definir rotas, APIs ou sessões.

**Engavete E Esconda Da Visualização (When Not To Call)**:
- Se não estiver envolvido na escrita, revisão ou arquitetura de código.
- Em discussões puramente de negócios ou marketing que não envolvam tecnologia.

---

## ⚠️ A Bíblia Das Leis: Regras Absolutas e Inquebráveis

> [!IMPORTANT]
> **Autenticação, Proxy e Sessão BFF**
>
> ❌ **Antíteses (Gatilhos Feios Falsos):**
> - Expor tokens (JWT, Refresh) ou session IDs no `localStorage` ou variáveis acessíveis ao Frontend.
> - Frontend chamando o Backend via API externa diretamente sem blindagem e validação.
>
> ✅ **A Beleza Da Forja (Regra Ouro Obrigatória):**
> - Autenticação entre frontend e backend **SEMPRE via iron-session** (cookie httpOnly, secure, sameSite=lax).
> - Frontend **NUNCA** se comunica diretamente com o backend API — todo request passa pelo **Proxy Autenticado (Next.js API Routes)**.
> - O Proxy decripta o cookie, extrai o `user_id` e repassa via header `X-User-Id` para o backend.
> - O Backend valida obrigatoriamente o header `X-User-Id` em TODAS as rotas protegidas usando injeção de dependência.

> [!IMPORTANT]
> **Row Level Security (RLS) no SUPABASE**
>
> ❌ **Antíteses (Gatilhos Feios Falsos):**
> - Tabelas públicas desprotegidas onde um cliente B pode dar fetch nos dados do cliente A.
>
> ✅ **A Beleza Da Forja (Regra Ouro Obrigatória):**
> - **TODAS** as tabelas DEVEM ter RLS habilitado, sem exceção.
> - Toda tabela de usuário DEVE ter coluna `user_id`.
> - Policies OBRIGATÓRIAS: `SELECT`, `INSERT`, `UPDATE`, `DELETE` filtrados por `auth.uid() = user_id`.
> - Tabelas públicas (ex: planos) DEVEM ter policy explícita de SOMENTE LEITURA. A escrita nessas tabelas ocorre **SOMENTE** via `service_role` (Backend).

> [!IMPORTANT]
> **APIs, Assíncrono e Segurança**
>
> ❌ **Antíteses (Gatilhos Feios Falsos):**
> - Endpoints sem verificação tipada, processamento bloqueante (síncrono puro) no FastAPI.
> - Logs sujos cuspindo informações de rastreio ou tokens pro painel.
>
> ✅ **A Beleza Da Forja (Regra Ouro Obrigatória):**
> - **TODAS** as rotas de API DEVEM ser autenticadas (exceto rotas públicas explícitas).
> - Input validation OBRIGATÓRIA em 100% das rotas via Pydantic.
> - **Todas** as routes e services do FastAPI DEVEM ser `async`.
> - Chamadas a APIs (Supabase, Stripe, IA) DEVEM ser `await`.
> - Streaming de IAs via **SSE (Server-Sent Events)** - NUNCA aguardar e bloquear pra cuspir tudo no final.
> - **NUNCA** expor IDs internos (`user_id`, `session_id`, `empresa_id`) no navegador do cliente, `console.log` ou URls (use UUID curto ou slug em URL se for estritamente fatal).
> - Erros 500 NUNCA entregam stack traces.

> [!IMPORTANT]
> **Brain & Agentes de IA (LangGraph)**
>
> ✅ **A Beleza Da Forja (Regra Ouro Obrigatória):**
> - Agentes complexos são desenhados como State Machines em LangGraph, nós com saídas tipadas.
> - Modelos da LLM respondem baseados em **Structured Output (Pydantic)**. Sem gambiarras de parse em texto livre!
> - Tools do agente não derrubam a esteira. Error handling em cada Tool.
> - Prompts em arquivos/blocos separados (NADA de template string hardcoded espalhado por lógicas).

---

## 🎯 Clean Code Padrão Elite (Fundação Do Código Limpo)

### 1. Funções e Métodos: "The Rule of One"
- **UMA Coisa Só:** Se usa a palavra "e" para justificar o que a função faz, quebre-a.
- **Micro Dimensão:** Máximo **20 linhas** estritas de miolo. Chegou nisso? Sub-funções entram em ação.
- **Máximo 3 args:** Mais que isso pede empacotamento em Pydantic ou Dataclass/Object.
- **Verbos Rígidos no Nome:** Use `create_subscription()`, `validate_input()`. Banido usar o sujo: `process()`, `handle()`, `do()`.

### 2. Nomenclatura Pura e Clara
- Revele intenções: Não use `d`, use `elapsed_time_in_days`.
- Nada das abominações abstratas nas classes: `Manager`, `Helper`, `Data`, `Info`.
- **Sem abreviações** lixeiras: `usr` -> `user`.
- Consistência total na gramática e lexico oficial.

### 3. Tratamento de Erros e Controle da Exceção
- Pare de devolver códigos aleatórios ou `None`/`Null` falso! Levante `Exception` clara e mortal!
- Use Exceções de Domínio de Negócio (`QuotaExceededError`) não uma `Exception` lixo genérica na base.
- Capture com `try/catch` de precisão cirúrgica (`ValueError`, `HTTPException`). Catch-all (`except Exception`) só se for no buraco final de resgate global.

### 4. Importações, Arquitetura e Organização
- **Lei de Demeter Rígida:** Não encadeie metralhadoras em cascata: `a.get_b().get_c().do_something()`.
- Um domínio, um arquivo. As coisas não se misturam como vitaminas erradas.
- Limpeza Absoluta do "Lixo Zumbi": Códigos comentados, imports desligados ou funções largadas **SÃO APAGADOS** do Repositório. Não guardamos defuntos (Existe o git para resgates).

---

## 🛡️ Os Mandamentos Finais Do Desenvolvedor Sênior

1. **Documente Suas Vitórias:** Se fez feature nova ou fix gigante > OBRIGATÓRIO escrever no `README.md` a funcionalidade e o mini fluxo do caminho feliz em "## Features".
2. **Type Hints e Strict Mode Absolutos:** Python roda com Type hints cegos em TUDO sem "Any". Typecript em Strict Mode absoluto. Proibido: `@ts-ignore`, `any`, ou `as unknown as x`.
3. **Padrão sobre Personalização Fálica:** Use Shadcn/ui puro, Supabase Client limpo, e seja chato pra criar coisa customizada sem permissão humana.
4. **.env é Sagrado:** Secrets e senhas NUNCA são chumbadas (Hardcoded) na história e vida do git. Existe um `.env.example` cego para mapear a infraestrutura de segredos.

---

## 🧰 Cinto de Verificação

- **Ao Terminar O Código**: Valide tudo perante este manual sagrado. Se há 21 linhas numa função, eu devo refatorar e reduzir antes do Commit. Se o dado tá em localStorage eu deleto e mando via cookie server.
