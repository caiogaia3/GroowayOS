---
description: Detectar riscos do sistema, acoplamentos ocultos e armadilhas que "quebram ao mudar", produzindo um relatório de risco através da análise de hotspots do Git e Análise de Lacunas (Gap Analysis), adequado para assumir projetos legados ou antes de grandes mudanças.
---

# /scout

<phase_context>
Você é o **Scout 2.0 - Especialista em Desmontagem de Estruturas**.

**Missão Central**:
Antes ou depois de atualizações de arquitetura (`genesis/v{N}`), investigar riscos sistêmicos, armadilhas veladas e acoplamentos.
As descobertas do Scout servirão como **entrada** (feedback) para a Visão Geral da Arquitetura (Architecture Overview).

**Objetivo (Output)**: `genesis/v{N}/00_SCOUT_REPORT.md`
</phase_context>

---

## ⚠️ CRITICAL Restrições do Fluxo

> [!IMPORTANT]
> O Scout não modifica a arquitetura, apenas faz a **observação** e a **documentação do relatório**.
> O seu relatório deve ser usado como referência na fase do Genesis.

> [!NOTE]
> **Explicação do Modo Duplo do Scout**:
> - **Modo A (Antes do Genesis)**: Analisar o código legado ou espalhado, produzindo os insumos de base para rodar o Genesis.
> - **Modo B (Após o Genesis)**: Validar a consistência do design com o código final construído (Gap Analysis - Análise de Lacuna).
> 
> Como julgar os Modos: Se `genesis/v{N}/concept_model.json` já existir → Modo B, o Step 5 executará comparações.  
> Se não existir → Modo A, pule a comparação do Step 5, extraindo apenas os conceitos diretamente do código bruto.

---

## Step 1: Visão Geral do Sistema (System Fingerprint)

1.  **Mapear o Root (Raiz)**: Liste todos os arquivos e diretórios essenciais armazenados no root do projeto.
2.  **Capturar o Contexto Arquitetural Atual** (Opcional):
    - Se a pasta `genesis/v{N}` existir, leia o seu arquivo `02_ARCHITECTURE_OVERVIEW.md` para criar a comparação base do "Planejado" versus "Realidade".

---

## Step 2: Desmontagem do Sistema de Build (Build Topology)

**Objetivo**: Identificar os limites de construção (builds) e as relações entre os produtos originados no projeto.

1.  **Chamar a Skill**: `build-inspector`
2.  **Etapas de Execução**:
    - Localizar os arquivos unificados de build logs e scripts (package.json, Cargo.toml, go.mod, Makefile, nixpacks, etc.)
    - Confirmar as premissas de unificação gerenciáveis (exemplo de workspace/monorepo)
    - Identificar todos os outputs (imagens de build do docker, arquivos bundles em next.js, binaries do python, etc.)
3.  **Pontos Principais de Saída (Output)**:
    - Lista Geral de Build Roots
    - Topologia Central (Monolith / Workspace / Polyrepo)
    - ⚠️ Risco: Adicione marcadores nos perigos de cruzamento de dependências.

---

## Step 3: Desmontagem da Comunicação em Execução (Runtime Topology)

**Objetivo**: Rastrear a comunicação (IPC channels) e os status contratuais diretos de comunicação e endpoints da aplicação.

1.  **Chamar a Skill**: `runtime-inspector`
2.  **Etapas de Execução**:
    - Levantar as entradas de execução global da aplicação. (O arquivo main.py or middleware.ts).
    - Mapear a cadeia total de geração que ativa os processos internos (spawn/fork/async/threads)
    - Monitorar e catalogar canais IPC ou chamadas abertas e contratuais.
3.  **Pontos Principais de Saída (Output)**:
    - Raiz do Processo e Suas Correntes
    - Avaliação do Contrato (Forte / Fraco / Inexistente)
    - ⚠️ Risco: Apontar falhas como processos zumbis, redirecionamentos longos nas páginas e drift protocolar do sistema.

---

## Step 4: Desmontar Acoplamento Histórico (Temporal Topology)

**Objetivo**: Entrar na raiz histórica do Github (ou Versionamento) para identificar a "zona escura" (os acoplamentos invisíveis que geram quebras no build de outros arquivos quando alterados).

1.  **Chamar a Skill**: `git-forensics`
2.  **Etapas de Execução**:
    - Verificar as modificações globais e os componentes ou linhas ativas que requerem alto Churn Rate da equipe.
    - Analisar interseções e "Landmines" acoplados nas camadas Raiz e Pastas Sensíveis
    - Localizar High Churn x High Complexity (Complexidade e Frequência de Erros)
3.  **Pontos Principais de Saída (Output)**:
    - Lista base Geral de Acoplamento do Projeto (Ex: src/a vs db/a cruzados)
    - Lista das zonas escuras/hotspots ou chamamentos órfãos
    - ⚠️ Risco: Mapeamento da Cruz Vermelha do Repositório (Acoplamentos fatais e diretos).

---

## Step 5: Modelagem do Domínio e Suas Regras (Domain Concept Modeling)

**Objetivo**: Levantar a conceitualização implícita do *Código Legado (a realidade)* atual.

1.  **Chamar a Skill**: `concept-modeler`
2.  **Comparação final**: Fazer o crossing (pareamento) dos conceitos puxados do Código x O Documento Arquitetural `genesis/v{N}/concept_model.json` (caso ele exista no modo B).
    - *Exemplificando Análise de Lacuna (Gap Analysis)*: "Sua arquitetura pedia validação X pelo Component P, mas no Código Real a validação é feita sem contrato no Middleware."

---

## Step 6: Riscos Analíticos e Mapa Estratégico do Repositório.

**Objetivo**: Prever o "Change Impact" - os bloqueios que uma feature recém implementada gera na saúde geral do código.

1.  **Se estiver fornecendo dados aos inputs e PRDs puros do Genesis**:
    - Consulte a base e integre a modelagem das mudanças pretendidas no `genesis/v{N}/01_PRD.md` do usuário.
    - Entenda se esses novos fluxos explodiriam as Zonas de Risco listadas na ETAPA 4 (Git Hotspots).

---

## Step 7: Geração Final e Dump do Relatório.

**Objetivo**: Elaborar um Log Arquitetural em Data/Timestamp para não apagar ou ofuscar referências cruzadas passadas e futuras.

Salve o Relatório em `genesis/v{N}/00_SCOUT_REPORT.md`

*(Nota: Caso ainda não exista `v{1..x}` a gravação apontará primeiramente para o `v1`.)*

Confirmar também que os diretórios acima de `genesis/v{N}/` existam antes de injetar os relatórios ou criar arquivos.

**Padrão do Relatório Documental deve preencher**:
1.  **System Fingerprint** (Raio-X e Estrutura Lógica)
2.  **Gap Analysis** (Documentos x Código Bruto)
3.  **Risk Matrix** (Hotspots Globais e Riscos de Rotas de Comunicação - IPC Risks)

<completion_criteria>
- ✅ System Fingerprint do GroowayOS foi consolidado.
- ✅ Detalhamento e Listagem de Document vs Code (Modo B Gaps).
- ✅ Salvo Documento Datado com todas e eventuais Matrizes de Risco para a Equipe de Genesis.
</completion_criteria>