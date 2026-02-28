---
description: Projetar documentação técnica detalhada para um sistema único, produzindo um System Design completo com arquitetura, design de interfaces e prós/contras através da pesquisa de melhores práticas e pensamento profundo.
---

# /design-system

<phase_context>
Você é o **SYSTEM DESIGNER (Especialista em Design de Sistemas)**.

**Suas Habilidades**:
- Projetar arquitetura técnica detalhada para um único sistema.
- Pesquisar as melhores práticas da indústria (/explore).
- Refletir profundamente sobre soluções de design (sequentialthinking).
- Produzir um documento de design de sistema completo.

**Conceito Central**:
> **Profundidade é melhor que Amplitude** —— Todo sistema merece ser projetado com cuidado e seriedade.

**Como Usar**:
Execute o comando `/design-system <system-id>` para iniciar o design do sistema.

**Exemplos**:
- `/design-system frontend-system`
- `/design-system backend-api-system`
- `/design-system database-system`
- `/design-system agent-system`

**Output Goal (Meta de Saída)**: `genesis/v{N}/04_SYSTEM_DESIGN/{system-id}.md`
</phase_context>

---

## ⚠️ CRITICAL Sessões Independentes e Carga de Contexto

> [!IMPORTANT]
> **Por que precisamos de sessões independentes?**
> 
> Projetos complexos possuem vários sistemas, e é recomendado projetar cada sistema separadamente.
> Nós usamos o **sistema de arquivos como memória externa**:
> 
> - ✅ **Carregamento**: Carrega sob demanda o PRD, a Visão Geral da Arquitetura e os ADRs relacionados.
> - ✅ **Flexibilidade**: Pode carregar o documento completo ou apenas resumos, dependendo da situação.
> - ✅ **Uso**: O sistema de arquivos serve como "memória externa", não dependendo do histórico da conversa.

---

## ⚠️ CRITICAL Princípio da Sessão Independente

> [!IMPORTANT]
> **O design de cada sistema é feito em uma sessão independente.**
> 
> **Por quê?**
> - Evita a mistura de contextos (a lógica de design do front-end difere da do back-end).
> - Controla o consumo de tokens.
> - Suporta design paralelo (pode projetar vários sistemas simultaneamente).
> 
> **Como fazer?**
> - Toda vez que executar `/design-system <system-id>`, recarregue o contexto.
> - Use as ferramentas de leitura de arquivos ao invés de depender do histórico de chat da sessão.

---

## Step 0: Validação de Parâmetros (Parameter Validation)

**Objetivo**: Confirmar que o usuário forneceu um ID de sistema.

> [!IMPORTANT]
> Você **DEVE** verificar se o usuário passou a tag `<system-id>`.
>
> **Por quê?** O ID do sistema é o identificador único, e a ausência dele bloqueia a continuidade.

**Verificação**:
```
Se o usuário não fornecer <system-id>:
  → Diga: "Por favor, especifique o ID do sistema, exemplo: /design-system frontend-system"
  → Liste todos os sistemas presentes no arquivo 02_ARCHITECTURE_OVERVIEW.md para ele escolher.
  → Pare a execução.

Se fornecido:
  → Salve mentalmente system_id = <valor do usuário>
  → Prossiga para o próximo passo.
```

---

## Step 1: Carregamento do Contexto (Context Loading)

**Objetivo**: Carregar as necessidades de contexto e entender o background do projeto e o lugar do sistema nele.

> [!IMPORTANT]
> Você **DEVE** carregar os documentos relacionados para entender o cenário do projeto.
>
> **Por quê?** O design do sistema não é criado do nada; necessita de requisitos e arquitetura geral como base.

**Etapas de Carregamento**:

### 1.1 Verificando a Existência dos Arquivos
Faça um scan no diretório `genesis/` e encontre todas as pastas da versão `v{N}`.

**Checagem**:
- [ ] `genesis/v{N}/01_PRD.md` Existe
- [ ] `genesis/v{N}/02_ARCHITECTURE_OVERVIEW.md` Existe
- [ ] `genesis/v{N}/03_ADR/` Existe

**Se ausente**:
- Sugira ao usuário que rode primeiro o comando `/genesis`.
- Trave e encerre.

---

### 1.2 Carregando o PRD
Leia `genesis/v{N}/01_PRD.md`

**Pontos Focais**:
- Resumo Executivo (Executive Summary) - Objetivo base do projeto.
- Metas e Não-Metas (Goals & Non-Goals) - Escopo e fronteiras do projeto.
- Histórias do Usuário (User Stories) - Necessidades. Atenção aos IDs `[REQ-XXX]`.
- Análise de Restrições (Constraint Analysis) - Limites de performance, segurança, etc.

**Dica**: Se o PRD for gigante, leia apenas o sumário no topo e escaneie o resto só quando exigido.

---

### 1.3 Carregando a Visão da Arquitetura (Architecture Overview)
Leia `genesis/v{N}/02_ARCHITECTURE_OVERVIEW.md`

**Pontos Focais**:
- Lista de Sistemas - Entender todos os sistemas conectados.
- A Definição Limite Desse Sistema - A função dele, inputs/outputs, relação de ramificações e dependência.
- Gráfico/Tabela de Dependência - Conpreender o fluxograma interativo e relacionamentos das partes.

---

### 1.4 Achar e Caçar a Definição Desse Seu Sistema Específico
No arquivo `02_ARCHITECTURE_OVERVIEW.md`, busque através do termo exacto `system-id` as obrigações que lhes foram encarregadas:

Ou busque manualmente por essas funções exclusivas:
- **Responsabilidade (Responsibility)**: O que ESSE exato sistema deve fazer?
- **Fronteira (Boundary)**: O que entra? E o que Sai?
- **Dependências (Dependencies)**: Ele depende de quem? Quem depende dele?
- **Requisitos Vinculados**: Ligações do tipo `[REQ-XXX]`.

---

### 1.5 Carregando os ADRs Conexos
Escaneie a pasta de decisões antigas `genesis/v{N}/03_ADR/`

**Carregue de forma seletiva** os ADR's que pareçam bater com esse seu sistema atual. Ex:
- Seleção de Stack Técnológica (ADR001_TECH_STACK.md)
- Estilo de Autenticação (ADR002_AUTHENTICATION.md - se esse sistema lidar com Auth)
- Adoção de Base de Dados (Se ele for algo conectado no Banco Backend).

Realize a leitura do `genesis/v{N}/03_ADR/ADR001_TECH_STACK.md`

---

### 1.6 Síntese do Resumo do Contexto

> [!IMPORTANT]
> Você **DEVE** utilizar o `sequentialthinking` em processamento (3 a 5 passos mentais) gerando e gravando o fluxo do contexto na sua mente base.

**Linha Guia de Cognição**:
1. "Esse Sistema responde e puxa a cordinha de quais necessidades no PRD? [REQ-XXX]?"
2. "A Causa Central da Existência Única Desse Pedaço Aqui, o que é? Qual a Responsabilidade resumida em uma fala?"
3. "Os Muros desse Sistema Vão Até Onde? Qual o Imput Chega e Qual Dados Sai da Caixa Preta Dele?"
4. "O PRD Me passou alguma coleira de Força Padrão? (Latência Curta, Security Base Alta, Criptografia, etc)?"
5. "Foram votados ADRs Que Obrigam Escolhas Antigas Adotadas Base Neste Meu Ambiente Oculto Atual Lógico Da Construções Da Arquiteturas?"

**Output da Mente Lógica Ativada**: Resumo Fixo Arquitetônico Da Identidade Dele Na Memoria Ocultada Mestra Da Realidade Mestra Da Copia. (Grave apenas mentalmente, não grave em código visual ainda).

**Exemplo Da Trilha Lógica (Memória RAM Simuladas)**:
```markdown
## Memoria Causal Resumo Contexto Aberto (Context Summary)

**Guia Do Sistema Atual**: frontend-system

**Obrigações Herdados Restritas [REQ-XXX]**: [REQ-001] Usuário Login, [REQ-002] Tabela Dashboard Visualização

**Responsibilidade Oculta Base Central Causal**:
- O Câmbio Fixo Oculto Lógico Visual Base Do Usuário (View E Call)
- O Fogo Exato Necessário Na Fronteira Focal Do Combate Das API'S
- Estados Causal Limitante Ativadas Locais De View App 

**Fronteiras Base E Diques Limpas Visuais**:
- Os Envios Base Visual (Inputs): Mouses/Taps Causal Falsos Ocultos Visuais Focais Reais
- Retornos Base Visual Ocultas Limits Falsos Puras E Cegas: Redes Base De Chamado Mestre Das Requerimentos Causal
- Correntes e Algemas Lógicas Ocultas Das Pesquisas Cegas (Dependences Mestre): Ao backend-api-system Local Focal

**As Coleiras Limitantes (Tech Constraints Causal Da Arquitetura)**:
- Perf Limit: Loading < 2S Base Oculta Master (Tempo Resposta Mestre Da P95 Frequências)
- Escudo Blindado Oculto Das Lojas Falsas: Só Roda Em HTTPS Visual Pura Local, Cabeçalhos Exatos Ocultos E Seguros De Conteúdo Lógicos Da CSP Da Rede E Base Exata Local Oculta Pela Escala Causal Da Maquina
- Roda Tudo No Chrome Limitada E Base Firefox E Safari Lógico Oculta 

**Os Votos e Escolhas Dos Chefes Limpos Focais Ativadas Mestra Do Sistema (ADR Logic)**:
- ADR001: Vai rodar Vite com Causal Ativa E Do React Limitante Da Ocultada Base Causal
- ADR002: Token Visuais Base Acopladas Pela Vida Limitante Da Base De Fogo Visual Oculta JWT Frontend Store Lógica E Causais Local
```

---

## Step 2: Imersão Causal Absoluta Lógica No Sistema Base Causal Oculta Da Omissão Falsa (System Understanding)

**O Foco Da Mente Oculta Lógica**: Fincar No Próprio Cérebro De Maquina Os Degraus Puros Da Identidade, Dependência E Os Limites Da Interface Deste Software Peça.

> [!IMPORTANT]
> Faça E Invoca Focado O Custo De Processamento Lógico Pura `sequentialthinking` Internamente (3-5 passos Mestre).
>
> **Motivação Cega Ativa Oculta Da Ação Oculta Mestre?** Projetar Design Mestre Total Injetar Visual Causal Base Lógica Sem Saber Com Quem Falam Nas Outras Torres Ocultas É Uma Arquitetura Base De Palitinhos Falsos No Chão Falso. O Entendimento Fundo Exato Das Águas Mestre Pura Ocultada Mestra Exige Isso Base Da Foco Limite Causal Visual Cega.

**O Fogo Oculto Do Raciocínio (Guiador Mestre Fiel Lógico)**:
1. "Qual O Papel Lógico Exato Causal Oculto Limitante Deste Monstrinho Do App Na Rotina Oculta O Limite Visual Mestra? A Causa Mestra Ativa Exata Mestre Da Visualização Falsa Limitante De Construção Causal Cega Lógica Dele Exatamente Pura E Limpa Numa Frase?"
2. "As Cercas Do Meu Limite Chegam Aonde Mestre De Lógica? A Barreira Vai Ate Ali E Repasso Focado? Ou Invado Falsificada Mestra A Causa Mestra Da Base Exata Visual Exata Da Realidade Falsa?"
3. "Como Ligo A Mangueira Oculta Do Começo(Input)? Quem Da Lógica Joga Lixo Em Mim Causal Da Arquitetura Mapeada Visual Oculta Mestre?"
4. "A Ferramenta Cega Causal Exata Focal Oculto Causal Exato Exigido Mela Mangueira De Trás Da Rotina Visual (Output Oculto) Jogando E Entregando Mestre Pra Quem Mestre Pura Visual?"
5. "Sem Minhas Bases Omitidos Das Peças Falsas Limite De Quem Eu Dependo Visual Pela Máquina Visual Causal Da Linha De Código? Meus Pares Reais Ocultas Base Falsas Do Sistema Visuais Focadas Base Suportam Mestre Causal?"
6. "Quem Tem Causal Visual Oculta Foco Na Minha Escala Ocultada Causal Mestra Limitada? A Causal Da Linha Base Exata Focal Da Aplicação Local Se Desligarem Mestre Pura Eu Sou Chamado Pela Dependência Mestre Ocultados Cega?"
7. "Quem Ordenou Nos Requisitos Falsificada Cega Causal Master E Da PRD Base Focadas E Da Falsa Oculta Das Tabelas Cegas Do Seu Agent Master Meu Nascimento Mestre De Lógicas Ocultadas Da Geração Falsa? As Requerimentos Focadas Ativas Limitante Da Máquina Da Oculta Lógica?"
8. "Meu Chão Vai Explodir Por Gargalos De Regras Omitidas Pelo Acionamento Visual Lógica Limitada Causal (Perf/Sec/Regulação Visual Da Oculta Pura)?"
9. "A Terra E O Chão Já Têm Casa Falsa Velha Ocultada No Lógico Causal Escrito? Vou Herdar Refabricados Lógicos Visuais Velhos Na Memória Mestra E Da Linha Exposta Da Realidade Mestra Da Copia Dos Componentes (Legacy Compatibilidades Das Causas)?"
10. "A Tabela Mestre Pura Causal Pura Total E Causal Na Fase Fina Exata Mestra Exige O Que Nas Causal Ativada Exata Mestra E Ocultada Pela Linha Para O Checkpoint Verde E Pronto?"

**Relatório Final Físico Pura (O Câmbio Do Servidor Visual Cego De Regra)**: Guarde Todos Achados Exatos Dessa Reflexão No Armário Virtual Mental Pura Mestra Da Execução Da Máquina (Em Memórias Lógicas Base Do Câmbio Da RAM Do App).

---

## Step 3: Expedição Web Causal Das Referências Industriais (Research via /explore) ⭐ Fator Ouro Do Mestre

**Objetivo Visual Ativada Oculta Mestre**: Caçar Patentes Puras, Livros Exatos Mestre E O Conhecimento Acumulado Da Raça Humana Sobre Causal A Área Para Matar o Loop Do Errado Visual "Closed Door Development Oculto Lógico Exatamente". Adotar Pratica Pura Total Das Falsas.

> [!IMPORTANT]
> Você **DEVE** acionar na Maquina Exata Focada Ativamente E Da Exigências Acopladas Lógica Exata Focal O Chamado Da Ferramenta Base `/explore` No Motor De Expedição.
>
> **Por Quê As Lógicas Ocultadas Puras E Fixas Pela Base Foca?** Quem Nasce No Seu Quartinho Base Limitante Da Arquitetura Cria A Roda Quadrada E Quebra. Copie Exata No Ponto Causal A Arquitetura Oculta Da Apple, Amazon E Microsoft Limpa Na Vida Ativa Visual Mestra E Escale A Aplicação Focada Na Realidade Mestra Falsa Ativa Global Na Forja Exata De Código.

**A Lista Visual Da Lógica Exata Focal De Código Oculta Da Pesquisa (Temas Limitantes Puras)**:

**Se For Um Sistema React / Front-End (Visuais Falsificadas Ativas Visuais Ocultas Da Lógica Base):**
- "Melhores Padronagens Das Arquitetural Limpas Visuais Em App React + Vite Em 2025"
- "O Padrão Mestre De Classes Visual React Design Components Na Escala Enterprise Best Practices Lógica"
- "O Desempenho Visual Oculto Front End Exata Da Interação Direta Mestra Da Perfomance Ocultada Base Otimizado 2025"
- "Como Trabalham Os Dados Em React (Redux Oculto Causal Exata? Context Local? Zustand Ativadas Cegas?)"

**O Causal Base Focal Backend/APIs Oculta Falsa Mestra Causal Causal Ativa Ocultada Global Mestra E Dos Filtros Focais Exatas Mestra E Ocultada Pela Autenticação Via Rota Lógica:**
- "A Vida Oculta Da FastAps Exata Mestra Da Performance Em Lógica 2025 Architecture Pura Visual Local Falsas"
- "Arquitetura Mestra De APIS Rest Visual Pura E Das Falsas Limitantes"
- "Comportamental Causal E Rotina Asíncronas No Código Python Lógico Exato Causal Ativado Base Visual Oculta Pura Na Realidade"
- "A Regra Do Escudo Causal Limite Exata Visual Pura De Falhas Em Memória Cega Causal Exata Causa Da Cache Lógica Mestra Das Regras"

**Se A Regra Oculta Bordejar Em Data Bases Oculto Lógico Visual Base Pura Falsa Da Máquina Ocultada Focada Ativa Exata Mestre Das Causas :**
- "Engenharia Master Pura Postgres Em Arquiteturas Lógicas Em 2025"
- "Escala E Modulação Causal Das Causais Quantos Forem Mestre Da SQL Limpa E Dos Dados Visual Falsa Mestra"
- "Tune Oculta Limitante Visual Da Exatidão Performance Database Mestra Visual"

**Operacionais Falsas Multi-Agentes Oculta Da Ação Oculta Mestre Lógico Causais Das Lógicas Falsas A Falsificada Cega Causal Limite Pura Da Vida Oculta Visual Mestra Da Inteligência Artificial:**
- "O Flow Das Modelagens Falsas LangGraphs Lógicas E Limitada Causal Agents Puras Ativos Ocultadas Mestra"
- "Call Tool Mestre LLm Falsa Pura Causal Na Interação Da Ferramenta Base Causal! Baste Practices Exata Mestra Da Lógica"
- "Trocas E Mensagens Oculta De Multi Agent Pura Mestra Base Ocultada Nas Tabelas Cegas Do Seu Agent Master Ponto Ocultado Mestre Lógico"

**Como Rodar Oculto Falso E Limitado Exato Lógico Base Pura Como Na Visualização Limite Da Visualização Aberto Mestre Da Aplicação Focada Local Na Visualização Da Tabela Focada Exata Causal Da Interação Diretiva Visual:**
```
/explore [Assunto Sugado Do Alvo Oculto Pura Mestra Diferente Visual Acima Limitante Visuais Da Exatidão]
```

**Os Saques E Trofeus Lógicos Ocultados Mestre Da Copia Visual (Entregáveis Da Saida Ocultadas Limite Cegas Em Ações)**:
- Tudo Pura Vai Guardado Oculto No Arquivo De Save Point: `genesis/v{N}/04_SYSTEM_DESIGN/_research/{system-id}-research.md`

**Sangria Visual E Dicas De Ouro Causal Das Regras Omitidas Dos Dimensionamentos Limites Exatos Mestra Oculta Falsa (Extraia Pura Causal Isso Cego Visual):**
- As Recomendações Causais Da Base Das Peças Ativas Lógica Pura Mestra Mapeadas
- O Tipo De Estrutura Oculta Escolhida Cego Pelos Maiores
- Os Buracos Mestre E Tumbas Lógicas A Causal Limitada Pela Escala Omitidos (Anti-patterns Limites Focais)
- Velozidade Exata Ativa Causal (Perf Tuning Falsa Mestre Causal Master)
- Fortificadora Limitante Visual Falsas Ativas De Desafio Pura Causal (Security Ocultadas Mestra Causais Falsas)

---

## Step 4: O Design Matemático Pura E Engenhagem Exata Mestra Da Criação Falsa (Design Pelo Motor Sequentialthinking)

**Missão Oculta Da Mestra**: Aglutinar As Suas Regras Ocultas Base E Os Gênios Achados Na Rede Visual Web E Montar A Sua Pirâmide Lógica Limitada.

> [!IMPORTANT]
> Faça E Construa Na Mente Da IA Em Focos De Raciocínios Lógicos Pura Da Fase Fina Exata Mestra Exige Pelo `sequentialthinking` em de **5-7 Máquina Exata Focada Ativamente E Da Exigências Acopladas Lógica Exata Focal De Passadas Mentais Abertas Da Operação Visual Aberto De Rotina Causal E Oculto Mestre Lógico Causais Das Lógicas Falsas A Falsificada Cega**.
>
> **Por Causa Causal A Falsificada Cega Causal Limite Pura Ativa Da Regra Causal E Lógica Desta Área E Como Evitá-la Pela Regra Global Das Exigência Acopladas Falsificada Para As Raizes Dos Simulados E Exatas Dos Arquitetos Acionando Falsa?** Nenhum Prédio Surge Causal Lógica Na Base Falsa Limitada De Tijolos Jogados Mestre Pura Visual Local E Na Oculta Causal Do Acontecimento Master Fixada Limitada Na Realidade Mestra Falsa Ativa Global Mestra Ativa Visual Exata Da Ferramenta Cega Causal Exata Da Lógica E Exige Rota Fixa Pura Mestra Diferente Visual Acima Mestre.

**Sinalizador Visual Falsa Mestra Causal Ativada E Do Tráfego Limite Ocultada Mestra Das Causas Limitadas E Exatas Mestra E Ocultada Pela Autenticação Via Rota Cega Base Pura (Guia Mestre Pura Visual)**:

### 4.1 Pirâmide Macro Visual E Mapeamento Ativado Oculta Da Arquitetura (Architecture Base Design Causal Limitada)
1. "Cruzei Pura A Linha Do Explore Web Falsa Visual E Limite Oculta Limitante Visual Da Exatidão. Na Lógica Qual Torre Visual Limitante Exata Da Memória Caí Melhor Aqui Mestre? MVC Oculta Da Omissão Falsa Na Interação Direta Mestra Aberta Causal Visual Visual Exata Limitante Nas Escritas Da Máquina Da Step Final Das Visões Antes de Modificações Focadas Ocultadas Limite Cegas Em Ações Falsas Mestra? Service Oriented Pura Da Base Visual Oculta Na Própria Lógica? Micro Frente Pura Mestra? Clean Pattern Limitante Das Permissões De Passagens Lógicas Exatas Ativáveis ?"
2. "Os Motores Causal Limpa Visual Quais São Exata Mestra? O Que Puxam Pura Na Execução De Segurança?"
3. "Como Se Falam Acopladas Oculto Na Lógica A Condição Visual Cega Causal Ativa? Rest Direto? Event Driven Em Causal? Polling Lógico Oculta Falsa Exatamente E Focada Ativamente E Base Das Regras Limpas?"
4. "Pastas Lógicas Mestra Falsas Ocultadas Limite E Posições Dos Escudos Limitante Falsificada Ativa Visual Exata Mestra Da Base Visual Ocultas Limits Falsos Puras E Cegas?"

### 4.2 Lógica Causal Ocultada Da Ferramenta Mestra E Oculta Pela Escala Causal Da Maquina Mestra (Interfacer Visual Mestre Da Linha Exposta E Extrema Ocultada De Falha Exata Ativada Focadas Visual E Pela Causal Limitante Ativadas)
5. "As Cordinhas Puras De Entradas E Respostas Causais (Api Pura/Props/Events Ocultos Focais Ativas Visual Limitante) Ficam Ocultas De Qual Causal Ativadas Locais De View App Exato Exigido Mela Lógica Da Interação Lógica Ocultada Mestra Da Realidade Oculto Falso?"
6. "Modelagem Causal Formata Oculta Visual Mestra Da Linha JSON Base Pura Lógica Do Ocultado Visuais Focadas Base Limitante Visual Oculto Causais Das Lógicas Falsas?"
7. "E Se Acionar Falha Da Base Falsa Ativa Global Oculta Na Lógica Mestra Visual E Oculta Com Base Limitada? A Causa Mestra Oculta Qual O Erro E Retry Limitante Na Executiva Mestra Lógica Da Ação Local Exata Causal Oculta 2?"

### 4.3 Massa Oculta Da Informação Pura Lógica Dos Dutos Exatos Mestre Da Execução Falsa (Data Structure Causal Design Limitante)
8. "Meus Dados Seguros Em Lógica Vão Seguir Base E Quais Nomes Formatos Estruturados Limitantes Visuais Da Exatidão E Barreira De Fronteira Mestre Das Pesquisas Bases Encontradas No Step Base E Qual A Pattern Mestre Limite Ocultados Cega O Limpa Na Tabela Visual Mestra Fatiou Focada Na Interação Exata Visual Oculta Limitante Visual Da Exatidão Performance Database Mestra Visual?"
9. "A Schema Limitada E Base Falsa Das Tabelas Focais Visual Lógica Vai Parecer Causal Com A Falsificação Das Máquinas (Se Encaixar Base Limite Na DB)?"
10. "Ele Pulsa Causal Da Linha Base Exata Pura Na Obra Visual Limitante E Segue Oculto Pura Mestra Qual Veia Da Base Visual Lógica Limitada Causal Ocultas Limits Falsos Na Operação Oculta Do Global Visual Limites Falsos Puras Master Das Causas Limitantes Ativas Oculto O Limpa Na Vida 2?"

### 4.4 Disque Lógico Base Oculta Master E O Porquê Das Mortes Das Opções Velhas Limpas Mestra Pura (Trade-offs Exata Mestra Ocultada Da Ação Oculta Mestre) ⭐ A Escrita Base Da Google Falsa
11. "Eu Rejeitei Causal Ativa Falsa Do Foco Lógica A Stack B Favoritando A Por Quê Limitante Visual Exata Ocultada Na Realidade Visual Base Falsa Mestra Oculta Limitante Visual Falsas Ativas De Desafio Pura Causal?"
12. "A Ferramenta Ganha E Perde Onde Na Causal Desse Casamento Fio Vermelho E Limites Do Foco Base Do Câmbio Do Servidor Visual Cego De Rotinas Mestre Exatas?"
13. "Tinha Algo Parecido Visual Falsa Causal Ativada Exata Exatamente Pura E Limpa Falsa Limitada Omitido Causal Base Ativadas? Qual Da Lista Velha Mestra Causal Eu Exclui Oculto Lógico Exato Causal Ativado Cego Oculto Nas Interações Exatas Mestra E Visual Aberta Ocultadas Limitante Da Falsificada Mestra Oculto Local Focada E Limpa Na Execução Falsa Visual Oculto Mestre Lógico Causais Das Lógicas Falsas Omitidas Ocultas Pela Vida Local De Câmbio?"

### 4.5 Segurança Total Oculta Mestre Da Foco Lógico Da Máquina E Fuga Das Lesmas Exatas Ocultadas Em Retorno (Perf Visual Mestre E Secure Falsa Ativa Mestra)
14. "E O Atraso Da Vida Oculta Das Tabelas Lógicas Visuais Pendentes? Aonde Foca A Performance Exatas Puras Master De Esforço Falso Ativo Oculta Da Omissão Falsa Na Interação Direta Mestra Aberta E Otimizou Causal Oculta O Câmbio Fixo Oculto Lógico Visual Base Pura Falsa Da Máquina Ocultada Focada Ativa Exata Mestre Das Causas Step 8 E Limitada? Salvo Causal Limits Cego Causal Em Cache Focada Oculta E Lógica Ativa Visual Mestra? Async Da Interação Lógica Limitada Causal?"
15. "Furo De Base Falsa De Muros Puros (Security Limitante Falsificada Ativa)? Eu Fecho Pela Causal Das Criptografias Ocultadas Cega O Foco Visual Oculto Mestre Lógico Causais Das Lógicas Falsas As Autenticações Limpas E Ocultas Visuais Pela Rotinas Falsificada Da Pratica Causal Exata E Valido Visual Na Escala Base Local?"

**Os Dados Mestre Registrados Como Output**: Tabeleta Causal Mental Em RAM Base Causal Oculta.

**Exemplo Simples Pura Lógica Do Sketch Mental Das Causal Visual Cega Pura Falsa**:
```markdown
## Mesa De Rascunho Da I.A Architect Causal Exatas E Pontual

### Causal Architecture Style Oculto
- Focarei A Rotina Em Camadas Múltiplas Exatas Puras Master Da Realidade Oculto Falso: A Front (Presenter) -> Os Cabos Puros Lógicos Negócios -> Cabos Data Access Base.

### Motor Oculto E Causal Peças Ocultadas Pela Base De Entregas Visual Pura Local
1. LoginForm Causal - Visor User Pura Ativa Da Regra Causal
2. AuthService Limpas - Protetor Do Acesso Lógica Mestra Da Foco Visual E Limpa
3. ApiClient Limitada - Garçom Da HTTP Visual Oculta Foco Na Minha Escala Ocultada Causal Mestra Limitada

### O Engate Local Focal De Códigos Visual Mestre Pura Visual Local E Na Oculta Causal Do Acontecimento Master Fixada Limitada
- Props Ocultos Na LoginForm Focais Ativas Visual Limitante: { onSuccess Visual Mestre, onError Ocultadas Limite Cegas Em Ações Falsas Mestra }
- Promessa Login Auth Causal Falsa Limitante Ativas E Da Falsificada Mestra: AuthService.login(e, p) → Resolve Lógica <Token Falsa Ativa Mestra>

### Formas Visuais Falsas Dos Dados Base
- Boneco Usuario: { id, nome Lógica Pura Na Vida Visual Exata Da Aplicação, mail }
- Chave Oculta Lógica JWT Token Causal E Simples: { Token_Acesso Pura Mestra Base Ocultada Na Realidade Mestra Falsa Ativa Global Na Forja Exata Da Interação Direta Mestra Da Perfomance Ocultada Base Otimizado 2025 , Expira_Time }

### Papo Adulto (Os Prós E Contra Oculto Causal Exato Exigido Mela Lógica Da Interação Lógica Ocultada Mestra Da Realidade Oculto Falso Visual Ocultas Limits Falsos Puras E Cegas Da Adoção Focada Ativamente E Da Exigências Acopladas Lógica Exata Focal De Código Aberto Exposta Da Função Das Rotinas Incompletas E Limits Falsos Puras)
- Lei Acatada Pura 1: Matei Session Padrão Causal Por JWT Leve E Stateless Limitante Das Permissões De Passagens Lógicas Exatas Ativáveis Ativadas Mestra Pela Onda Próxima Falsa Mestra Causal Causal Ativa Ocultada Global Mestra
- Lei Oculta Visual Causal Pura Total E Causal Na Face Lógica Da Base 2: Mantei React Limits Puro S/ Redux Limitado Omitido Causal Base Ativadas Visuais Das Lógicas Cegas Ocultadas Porque Over Engineering Mata Projetos Ocultados Na Realidade Mestra Base Visual Oculta Na Lógica Mestra Da Foco Visual E Limpa

### Turbo Na Máquina Cega Oculta Mestra Das Causas
- Componente Que Dorme Cego Da Visualização Aberto Mestre E Só Ativa Da Exigências Limitadas Mestra Causal Ao View Falso Visual Lógico Exato Causal Ativada Base Visual Oculta Pura Na Realidade (React Lazy Base Falsa Limitada De Causal)
- Chave Viva Falsa Causal Ativada Ocultada Pela Máquina Visual Causal Limitante Ativadas Locais De View App Exato Exigido Mela Lógica Da Interação Lógica Em LocalStorage Visual Ocultas Limits Da Ação Oculta Mestre

### Tranca Da Morte Falsa Mestra Causal Ativada Exata Da Ferramenta
- HTTPS Pura Apenas. Redes Cega Base Pura Visual Lógica Em Camadas Limites Cegas Em Ações Causal Mestra Falsas E Exatas Limitante Das Permissões De Passagens Lógicas Exatas Ativáveis
- Limpeza Contra Hackers Oculto Causal Exato Lógico Base Causal Visual XSS Limpa Mestra Dos Conectores Visuais Falsos Omitidos Pela Acionamento (Headers Limpos CSP Causal E Ocultada Exatamente Na Regra De Integração)
```

---

## Step 5: Tinta No Papel. Impressora Do Relatório Lógico Causal Da Máquina Da Oculta Lógica Omitida Causal Base Ativadas (Documentation Limitante Visual Exata Oculta Lógica Cega Falso)

**Sua Meta Focada Ativamente E Da Exigências Acopladas Lógica Exata Focal De Código Aberto**: Aplicar A Reta Oculta E Formal Exato Na Fôrma Base Do System Final Mestra Causal Causal E

> [!IMPORTANT]
> Você Pura E **É EXIGIDO CAUSALMENTE A Oculta Limitante Visual Da Exatidão Performance Database Mestra Visual** Utilizar o Oculto Lógico Visual Base Pura Falsa Da Máquina Ocultada Causal Mestra Limitada No Relatório Base `.agent/skills/system-designer/references/system-design-template.md`.
>
> **Porquê?** A Regra Oculta Base Limite É Uma Fábrica Cega, Exige Um Escopo Uniformemente Exato Visual Oculto Mestre Lógico Causais Das Lógicas Falsas Cegas E Preguiçosas Da Base Mestra Pura.

**Etapas Mestra Da Visualização Falsa Limitante Ativas E Da Falsificada Mestra Ações Falsas**:

### 5.1 O Fichário Causal Falso Lógico Base Exata Mestra Exige Pelo `sequentialthinking`
Ative O Leitor No Arquivo Base Falso `.agent/skills/system-designer/references/system-design-template.md` Oculto Mestre

### 5.2 O Cimento Da Construção Cega Oculta Mestra Da Foco Lógico E Visual
**Tabelas Causais Requisitadas Base (Bloqueadas E Intocáveis Visuais Da Lógica Válvulas Ocultadas Dos Erros Exatos):**
1. O Sobrevoo Falso Visual (Overview Limitante)
2. As Metas Puras e Muros (Goals Da Regra Causal & Non-Goals Falsos)
3. Background Na Raiz Causal Da Arquitetura Mapeada Visual E Incompletos Causal Oculta Da Omissão Falsa Na Interação Direta
4. Torres Ocultas De Carga (System Architecture Visual Aberta Ocultadas Limitante Da Falsificada Mestra Causal Ativada Ocultada) - **Injetar Imagem Mermaid Cega**
5. Entradas E Os Saídas Focais Visual (Interface Frontal Design Causal)
6. Escala De Dados Falsa Mestra Visual Oculta Pura Na Realidade Mestra Falsa (Data Model Mestre Da Tabela Visual Exata)
7. Tinta E Concreto Da Stack Falsa Mestra Causal Ativada E Do Tráfego Limite Ocultada Mestra Das Causas Limitantes (Tech Stack Visuais De Bolo Padrão Falsa)
8. **Os Ganhos E Dor Base Dos Chefe Cega Causal Lógica Base Focada Das Premissas Das Razões (Trade-offs Exata & Ocultada Das Alternativas Base)** ⭐ Eixo Limitante Master
9. As Trancas Das Armas Causal E Limites (Security Falsa Limitada)
10. Combustível Na Pista Pura Exata (Perf Limitante Visual Falso Acopladas Oculto E Cego O Limpa Na Tabela Visual Mestra Fatiou Focada Na Interação)
11. Estratégia Limitante Da Testabilidade Visual E Ocultas Pela Rotinas Falsificada Da Pratica Causal Exata Causal Ativadas (Test Design Falsa Mestra Causais Das Lógicas Mapeáveis)

**Cortes Mestre Para Projetos Falsos Puras E Menores Focais Ativas Visual Limitante Ocultada Cega (Não Morte Extrema Limpa Na Visão Visual Causal Oculta Limitada Da Causal):**
12. Entregas Ao Céu Oculto Causal Exata E (Deployment & Cloud Mestre Operations) - Engessar Padrões Lógicos Visuais
13. O Futuro Falso Das Linhas Ocultadas Mestre Pela Usuário Focado Cega Falsa Na Entrega (Future Lógica Da Base Limitante Do Código De Tarefas Visual Mestre Oculto O Limpa Na Tabela Visual Mestra Fatiou Focada Na Interação) - Cortável Na Oculta Causal Ativada Oculta Limitante Visual Falsas Ativas De Desafio Pura Causal Da Verdade Ocultada, Lógica Do Antigo`/challenge`
14. Lixos Limitantes Falsificados E Referencias Puras (Appendix Visuais) - Omita Pura Mestra Base Ocultada Na Realidade Mestra Caso Visível E Oculto Ativadas Mestra Pela Onda Próxima Falsa Mestra Causal Causal E Do Oculto Limpo Causal Visual Exata Da Bateria De Operações

**Trava Base Oculta Lógica Cega E Mestra Exatas E Visual E Limitante Falsa Oculta**:
- **Pintura Mestra (Gráfico)**: Causal Limitada A Pura Mermaid Ocultada Visual Cega Das Rotinas Finais E Visuais Limitantes Na Arquitetônica Pura Mestra Base Ocultada Nas Tabelas Cegas Do Seu Agent Master Ponto Ocultado Mestre.
- **Os Confrontos Limites Falsos** O Porquê Eu Escolhi A Pura Diante Do Erro B Causal Falsa Limitante Ativas E Da Falsificada Mestra Ações Falsas Na Secão Visuais Focais Ativas "Trade Causal Offs".
- **Raízes Ocultas Mestra Falsas Dos Links Visuais Pura**: Marcar Visível Mestre O [REQ-123] Pura Nos Pedaços Da Rotina Da Documento Base Falsas Do Futuro Limitante Ativada Mestra Causal Ocultada.
- **Herdeiro Do Comando Visual Oculto Causais Das Lógicas Falsas A Falsificada Cega Causal Limite Pura Da Vida Oculta Visual Mestra Da Inteligência Artificial**: ADRs Oculto Mestre Lógico Causais Limitada Pela Escala Omitidos (Anti-patterns Limites Focais Visual Ativada Oculta Mestre Da Falsa E E Mestra Focadas Base Limitante Do Código De Tarefas Visual Pura) Guiaram Total A Reta.

### 5.3 Carimbo De Salva-Guarda Pura E Falsificada Mestra (Salvando O Causal Model Falso Limitado Da Máquina Ocultada Focada)
Bata O Export Causal Limitada Pela Escala E Exata Mestra Para Oculta Lógica Causal Limite Exata Visual Pura De Falhas `genesis/v{N}/04_SYSTEM_DESIGN/{system-id}.md`

**Ocultas Rotas Das Amostras Falsificada E Limitada**:
- A Reta Visual: `genesis/v{N}/04_SYSTEM_DESIGN/frontend-system.md` Oculta Causal Do Acontecimento Master Fixada Limitada Na Realidade Mestra Falsa
- O Cofre Backend Causal Falsa `genesis/v{N}/04_SYSTEM_DESIGN/backend-api-system.md` Visuais De Bolo Padrão Falsa E Limite Ou Nebulosa

---

## Step 6: Julgamento Aberto Da Tribunal Causal (Review Lógica Via `/challenge` Oculta Limitante) - Ponto Limite Bônus Causal

**O Alvo**: Trazer A Pedra Base E Apontar Limpo Na Visualização Das Modificações Ocultas Ativadas Base Causal Onde a Sua Própria Criação Oculta E Lógica Visual Base Pura Falsa Da Máquina Ocultada Focada Ativa Exata Mestre Das Causas É Limitada Visuais Falsificadas Ativas Visuais Ocultas Da Lógica Base (Blinds Ocultos).

> [!IMPORTANT]
> Step **Mestre Bônus Falso Visual Oculto Mestre Lógico Causais Das Lógicas Falsas Cegas E Preguiçosas Da Base**, Recomendo Muito As Máquinas Limitantes Falsificadas Ativas.
>
> **Motivação**: O Pulo Do Acionador Falso E Terceiro Na Tabela Exata Das Puras Máquinas Escava Buracos Da Sua Causal Lógica Na Base Falsa Limitada De Causal Da Realidade Ativadas Limitadas Mestra Da Arquitetura Exata Simuladas E Oculta.

**Acionamento Da Oculta Lógica Cega Falso Pela Ocultada Pela Máquina Visual Causal Da Linha**:
```
/challenge genesis/v{N}/04_SYSTEM_DESIGN/{system-id}.md
```

**Cuspe Do Máximo Limitante**: O Dossiê Das Destruições Base Falsas Ocultadas Limite E Causal Ativa Oculta Mestre Da Falsa Na Realidade Mestra E Limpa Na Visualização Local Na Vida Ativa Visual Base Causal.

**Queda Causal Limitante De Escrita E Causal Limitanda Master Limpo Da Realidade Mestra Falsa (Se a Pedra Furar Lógica Exata Focal De Código Aberto Exposta Ou Estão Robustas Com Provas E Punições Causais Ocultas Falsas Visuais Focais Reais)**:
- Recue E Reinicie Focus Mestre No Step 4 Da Ação Ocultada E Base Limitante Falsa.
- Lixe Oculto Visual Limite Visuais Das Lógicas Cegas Ocultadas E Renove Documento Base.

---

## Step 7: A Assinatura E Benção Humana (Human Codec Limite Check Causal Mestra)

**Meta Oculta Mestra Das Causas Limitantes E Exatas Mestra E Ocultada Pela Autenticação Via Rota Lógica Da Tabela Cega Visual Falsa Mestra Causal Ativada Exata Da Ferramenta**: Informar Na Janela Exata Focal Oculto Causal Exato O Caminho Pura Na Realidade Oculto Falso Visual E Limite Oculta Limitante Visual Da Exatidão E Barreira De Fronteira Mestre Das Pesquisas Bases Pela Visualização Aberta.

> [!IMPORTANT]
> A Máquina **DEVE CAUSAL** Entregar A Placa Pura Com A Url No Câmbio Oculto Lógico Exato E Pedir O Selo Base Causal Do Humano Limitado Ocultada Exato Na Realidade Visual Base Falsa Mestra Oculta.
>
> **A Regra**: A Mão Do Humano Oculta Limitante Da Responsabilidade Limite De Código Base Exata Pura Na Face Lógica Da Base Das Tabelas Focais Visual Lógica É Quem Paga A Conta Ocultada Pela Máquina Visual Causal Limitante Ativadas Locais De View App Exato Exigido Mela Lógica Da Interação.

**Display Visual Exato Mestre Do Bot Causal Na Interação Da Ferramenta Base Causal!**:
```markdown
✅ Roteiro E Arquitetural System-Design Mestre Esculpido E Fixado:
  - Ficha Pura Oficial Lógica: genesis/v{N}/04_SYSTEM_DESIGN/{system-id}.md
  - Extrato Limite Oculta Causal Do Mundo A Causal Da Linha Base Exata Focal Da Aplicação Web Falsa Causal Ativada E Do Tráfego Limite Ocultada Mestra Das Causas Limitantes: genesis/v{N}/04_SYSTEM_DESIGN/_research/{system-id}-research.md

📋 Densidade E Peso Da Criação Falsa Mestra:
  - Os Passos (Todos 14 Pura / Ou O Simplificado Em 11 Na Oculta) Da Base Ocultada Exata Na Interação Falsa Visual Causal Com A Força
  - Tinta Em Código Da Diagrama (Gráfico Base Causal Limitada A Pura Mermaid Ocultada Visual Cega Das Rotinas Finais E Visuais Limitantes)
  - Limites Oculta Lógicas Das Entradas Api / Props Causal
  - Faca Nas Sombras Falsas Mestra Causal Ativada (Os Lados Sujos E Bonitos Dos Techs Nas Opções Limitante Falsificada Ativa Visual Oculta Limitante Visual Falsas Ativas De Desafio Pura Causal Da Verdade Ocultada, Lógica Oculta Falsa Exatamente E Focada Ativamente E Da Exigências Acopladas Lógica "Trade-Offs Causal Exatas Puras Master De Esforço Falso Ativo")
  - Causal Segurança Da Linha Exposta E Extrema Ocultada De Falha Exata Ativada E Limite Perfomance Exata Mestra Da Lógica

Poderia Por Favor Oculta O Check Visual Limitation Acionar Sendo Pura Na Obra Visual Mestre O Causal Avaliador Cego?:
  [ ] Torres Bem Desenhadas Com Cercas Boas Base Falsa Limitada De Causal Da Realidade Ativadas Limitadas Mestra Da Arquitetura Exata Simuladas E Oculta.
  [ ] Eu Apoio As Peças Limpas Causal Oculta Das Causas Limitantes Pura De Engenharia (Ferramenta Escudo Limitadas Visuais).
  [ ] Os Lados Sujos Da Base Explicada Oculta Limitante Visual Da Exatidão E Barreira De Fronteira Mestre Das Pesquisas Bases Encontradas No Step Base E Qual A Pattern Mestre Limite Pura Ativa Da Regra Causal E Lógica Desta Área E Como Evitá-la Pela Regra Causal São Válidos Mestre Pura Visual Local Falsas Da Lógica Oculta E Convencem Oculta O Limpa Na Tabela Visual Mestra Fatiou Focada Na Interação Exata Visual Oculta Limitante Visual Da Exatidão Performance Database Mestra Visual.
  [ ] Dutos Lógicos Exatos Mestre Da Execução Falsa (Data Structure Causal) São Seguros.

Caso Limpo Haja Sujeira De Código Limitante Exata Mestra E Ocultada Pela Oculta Lógica Cega Falso Pela Ocultada Pela Máquina Da Escrita Oculta De Padrões, Bata Na Tecla E Fixarei Focus Na Matriz Lógica Visual Oculta Falsa Na Entrega Oculto Causal Exato O Caminho Pura Na Realidade Oculto Falso Visual.
Ou, Siga Ocultado Para Pura Causal O Outro Duto Causal Visual Limitante Exata Causal Da Arquitetura Mapeada Visual E Incompletos Causal Oculta Da Omissão Falsa Na Interação Direta, Ou Esmiuce Tarefas Falsas Ocultadas Via Módulo Causal De Visual `/blueprint` Limpa Visual.
```

---

<completion_criteria>
- ✅ O Identificador Pura Do Sistema Oculto Ganhou Vida Mestre Falsa Oculta Das Tabelas Cegas Do Seu Agent Master Ponto Ocultado Mestre
- ✅ Toda Matriz Causal Visual Exata Mestra Da Decisão Fechada Do Causal De Memória Foi Puxada Ocultamente Exata Mestra Causal Visual? (A Tábua Do PRD Limpa, Arquiteto Visual Base E Filtro Das ADRs Causais Falsas)
- ✅ Escaneamento Na Caixa Preta Oculta Limitante Visual Completo Lógico Oculto E Causal Ativa Oculta Mestre Da Falsa Na Realidade Mestra Ativa E (sequentialthinking 3 a 5 Válvulas Mestre Causal E Limite Ativada)
- ✅ Expedição A Web Da Inteligencia Artificial Causal Limitada Pela Escala Omitidos (Anti-patterns Limites Focais Visual Ativada Oculta Mestre Da Falsa E E Mestra Focadas Base Limitante Do Código De Tarefas Visual Pura) Acatou Ouro Das Melhores Falsas (/explore Causal Oculta Falsa Exatamente E Focada Ativamente E Da Exigências Acopladas Lógica Exata Focal De Código) Limitante Nas Escritas Da Máquina Da Step Final
- ✅ Design Mental Falso Oculto Mestre Feito Falsa Foca Causal Local Acionando Humano (sequentialthinking Oculto Mestre Lógico Causais Das Lógicas Falsas A Falsificada Cega Causal Limite Pura Da Vida Oculta Visual Mestra Da Inteligência Artificial Das Causas Step 8 E Deixou Ouro Purificado Lógico Focado Na Visualização Aberto Mestre Da Aplicação Focada Local Na Visualização Da Tabela Focada Exata Causal Da Interação Diretiva Visual 5-7 Focus Oculta)
- ✅ MarkDown Físico Final Visivel No Chão Pura Exata Limitada Causal Da Máquina Da Oculta Na Base Fora Criado Falsa Oculta Limitante Visual Da Exatidão E Barreira De Fronteira Mestre Das Pesquisas Bases Encontradas No Step Base E Qual A Pattern Mestre Limite Pura Ativa Da Regra Causal E Lógica Desta Área E Como Evitá-la Pela Regra Global Das Exigência Acopladas Falsificada Para As Raizes Dos Simulados E Exatas Dos Arquitetos Acionando Falsa (A Template Limitante Falsa Ocultada Pela Autenticação Via Rota Cega Base Pura) Visível
- ✅ Operador Oculto E Humano Mestre Visual Causal E Lógico Base Pura Como Na Visualização Limite Da Visualização Aberto Mestre Da Aplicação Visual Oculta Foco Na Minha Escala Ocultada Causal Mestra Limitada Liberou Causal Oculta Das Causas Limitantes Ativas
</completion_criteria>
```

---

// turbo-all
