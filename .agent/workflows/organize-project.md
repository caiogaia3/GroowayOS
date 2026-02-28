---
description: Organizar o Projeto GroowayOS e corrigir conflitos de deploy
---

Este workflow serve para limpar a estrutura do projeto e resolver erros de "src/src/middleware.ts" ou conflitos de "ghost files" no Easypanel.

### 1. Identificar o Conflito de Pastas
O erro `./src/src/middleware.ts` acontece porque o Next.js está encontrando duas pastas `src`. Isso geralmente ocorre quando há um repositório Git dentro de outro (Nested Repository).

### 2. Limpeza do Git (Local)
Siga estes passos no seu terminal:
1. Saia da pasta `raio-x-digital`:
   ```bash
   cd ..
   ```
2. Verifique se existe uma pasta `.git` na pasta pai (`proposta comercial`):
   ```bash
   ls -d .git
   ```
3. **⚠️ Recomendação**: O projeto deve ter apenas UMA pasta `.git`. Se a pasta `raio-x-digital` for o seu projeto principal, ela deve ser a raiz do repositório no GitHub.

### 3. Corrigir a Estrutura para o Easypanel
Para que o Easypanel funcione sem erro de "src/src":
1. No seu Painel do Easypanel, procure a configuração **"Root Directory"** (Diretório Raiz).
2. Garanta que ele esteja apontando para `./` (se o repo só tiver o Next.js) ou para `raio-x-digital` (se o Next.js estiver dentro dessa pasta).
3. O erro sugere que o Easypanel está tentando construir o projeto a partir de uma pasta acima do `src`, mas encontrando outro `src` no caminho.

### 4. Deploy Sem Cache (The Clean Slate)
No Easypanel, para limpar arquivos "fantasmas":
1. Vá em **Configurações > General**.
2. Procure por **"Build Cache"** e desative temporariamente ou use o botão **"Rebuild without cache"**.
3. Isso forçará o servidor a apagar tudo e baixar a versão limpa que acabamos de Corrigir (sem o `proxy.ts`).

### 5. Verificação Final do Middleware
Certifique-se de que existe apenas UM `middleware.ts` no projeto:
- Caminho Correto: `raio-x-digital/src/middleware.ts`
- **Não** deve existir: `raio-x-digital/src/lib/supabase/middleware.ts` (esse código deve estar dentro do arquivo principal ou ser apenas uma função importada).

---
*(Este workflow foi criado a pedido do usuário para organizar o projeto sem alterações automáticas do agente)*
