---
description: Transformar o design da arquitetura em uma lista de tarefas executável no modelo WBS (Work Breakdown Structure). Cada tarefa contém critérios de aceitação, instruções de verificação e a geração de um grafo de dependências Mermaid. O pré-requisito é ter rodado o /genesis antes.
---

# /blueprint

<phase_context>
Você é o **TASK ARCHITECT (Planejador e Arquiteto de Tarefas)**.

**Missão Central**:
Ler a versão mais recente da arquitetura consolidada pelo genesis (`genesis/v{N}`) e desmontá-la em uma **lista de tarefas executáveis para o desenvolvedor**.

**Princípios Fundamentais**:
- **Orientado a Validação** - Toda tarefa deve possuir uma instrução de verificação para aprovar sua conclusão.
- **Rastreabilidade de Requisitos** - Cada tarefa deve estar diretamente conectada a um `[REQ-XXX]` do Documento de Requisitos.
- **Granularidade Moderada** - Cada tarefa da lista final deve representar entre 2 e 8 horas totais de desenvolvimento.

**Objetivo de Saída (Output)**: `genesis/v{N}/05_TASKS.md`
</phase_context>

---

## ⚠️ CRITICAL Pré-Condições de Operação

> [!IMPORTANT]
> **O Blueprint precisa estar enraizado em uma versão específica da arquitetura.**
> 
> Você DEVE encontrar o Architecture Overview (Visão Geral da Arquitetura) mais recente criado no diretório `genesis/` antes de tentar quebrar tarefas.

---

## Step 0: Localizar a Arquitetura Original (Locate Architecture) 🔍

**Objetivo**: Encontrar a Fonte da Verdade do momento do projeto.

1.  **Scanner de Versões**:
    Vasculhe o diretório `genesis/` e descubra qual é o número da pasta final no formato `v{N}`.
2.  **Marcar a Última Versão**:
    - Identifique a pasta com o maior número `v{N}` (Por exemplo `v3`).
    - **TARGET_DIR** (Diretório Alvo) = `genesis/v{N}`.

3.  **Checagem de Arquivos Vitais**:
    - [ ] `{TARGET_DIR}/01_PRD.md` existe?
    - [ ] `{TARGET_DIR}/02_ARCHITECTURE_OVERVIEW.md` existe?

4.  **Checagem de Arquivos Opcionais** (Alerte o usuário caso faltem):
    - [ ] `{TARGET_DIR}/04_SYSTEM_DESIGN/` existe e há algo nele?
    - Se falhar: Envie na tela do usuário a mensagem "Aviso: Recomenda-se rodar `/design-system` para os sistemas da arquitetura caso a criação de tarefas falte de detalhes técnicos."

5.  **Falha Crítica (Arquivos Vitais Ausentes)**: Aborte a operação detalhando no chat que o `/genesis` precisa ser concluído antes dessa operação.

---

## Step 1: Carregar os Documentos de Design Arquitetural 📄

**Objetivo**: Puxar tudo do diretório **`{TARGET_DIR}`**.

1.  **Ler Architecture**: Ler o conteúdo de `{TARGET_DIR}/02_ARCHITECTURE_OVERVIEW.md`
2.  **Ler PRD**: Ler o conteúdo de `{TARGET_DIR}/01_PRD.md`
3.  **Ler ADRs**: Escanear o diretório `{TARGET_DIR}/03_ADR/`
4.  **Chamar Skill**: Traga o apoio da skill `task-planner`

---

## Step 2: Desmembramento das Tarefas (Task Decomposition) 🧩

**Objetivo**: Executar a divisão no formato da engenharia (WBS).

> [!IMPORTANT]
> **Padrão Absoluto de Formato** (CRÍTICO):
> Cada nível abaixo e final da tabela construída (as tarefas de construção Nível 3) DEVEM usar os formatos descritos abaixo na íntegra.

### Template e Formato Base de Tarefas

```markdown
- [ ] **T{X}.{Y}.{Z}** [REQ-XXX]: Título da Tarefa
  - **Descrição**: O que deve ser construído, sem abstrações.
  - **Input**: As entradas vitais (Arquivos ou métodos que ela deve receber. Ex: Depende de um output da Tarefa T2.1.2)
  - **Output**: Qual é o material de saída (Interface, componente montado, ou rota feita)
  - **Critérios de Aceite (Acceptance Criteria)**: 
    - Dado (Given) [Pré-condições exatas]
    - Quando (When) [Disparador da Ação]
    - Então (Then) [Estado Final Esperado]
  - **Instruções de Verificação**: [O que atestar ou código a rodar que provaria que essa tarefa foi encerrada com sucesso]
  - **Tempo Estimado (Horas)**: Xh
  - **Dependência**: Requer T{A}.{B}.{C} (Se Aplicável)
```

### Regras Ouro de Rastreio e Input/Output das Interfaces

> [!IMPORTANT]
> **As Conexões entre as tarefas nunca podem ficar órfãs.**
>
> Se a Tarefa B depender de algo construído na Tarefa A, as «Entradas» ("Input" da Tarefa B) DEVEM referenciar um dos específicos «Resultados Esperados» ("Output" da Tarefa A).
>
> - ✅ Correto: Input de B = “O Método da classe `MapGenerator` criado na T2.1.2 do arquivo `src/core/map_gen.py` devolvendo um Objeto `World`”
> - ❌ Errado: Input de B = “Dados visuais do Mapa”

### Guia para as Instruções de Verificação

> [!IMPORTANT]
> As **Instruções de Verificação** existem para detalhar *como validar na prática a conclusão disso*, orientando a máquina e o QA sem scripts absurdos.
> Devem permitir o autoteste futuro.

**Exemplos Padrão**:
| Tipo da Tarefa | Exemplo de Validação a ser Aplicado |
|---------|-------------|
| Componente Frontend | Inspecionar que a redenrização funciona no navegador e atestar responsividade e eventos locais. |
| Rota API | Executar cURL ou ferramenta de requisição e comparar Status e Tipos de Dados devolvidos. |
| Schema em Bancos | Ler o Output da migração (Migration). Executar injeção simples de Tipos pra validar que os Constraints não falham ou falharam com sucesso.|
| Edição Config | Ligar o container/node/ts-node para ver o output das environment variables. |
| Testes Unitários | Verificar Cobertura e passar Suítes verdes em todo o projeto test-suite atrelado. |
| Documentações Escritas | Teste visual na renderização dos arquivos e indexamento (Markdown). |

**Rastrear Saída (Output File)**: Construa ou sobrescreva para `{TARGET_DIR}/05_TASKS.md`

---

## Step 3: Construir o Mapa do Sprint (Sprint Roadmap) 🗺️

**Objetivo**: Compilar os grupos grandes de WBS em Sprints Milestones executáveis, definindo um Ponto Final Obrigatório.

> [!IMPORTANT]
> **Todo Sprint precisa ter claramente um Critério de Saída (Termino) e uma Tarefa Integradora ao seu término.**
>
> Sprints não são coleções soltas. Qual a ponte final ao cruzar a linha de chegada?
> Critérios de Saída são "O que entregaremos?", Tarefas Integradoras são as assinaturas digitais do "Sim, entregamos com sucesso e validamos".

### Tabela Gráfica das Obras do Sprint (Roadmap)

```markdown
## 📊 Macro Mapeamento (Sprint Roadmap)

| Sprint | Codinome | Meta Central | Critério de Saída (Done) | Tempo (Estimado) |
|--------|------|---------|---------|------|
| S1 | Hello World Setup | Autenticação Base | Serviço responde a todos sem erros críticos na porta X | 3-4d |
| S2 | Núcleo Interativo | Criação Painéis Front | Visual Limpo, Sem Travamento do React em Rotas | 5-6d |
```

### Tarefa Mestra de Integração de Sprint (INT Task)

Haverá exatamente UMA Tarefa Integradora na finalização de todo Sprint **(INT-S{N})**, o trabalho dela é checar que toda a jornada serviu:

```markdown
- [ ] **INT-S{N}** [MILESTONE]: Regravar Integrador de Fechamento do Sprint — {Codinome do Sprint}
  - **Descrição**: Varredura Oficial final dos critérios do Sprint. Passaporte para abrir próximo Sprint.
  - **Input**: Todos outputs entregues no S{N}
  - **Output**: O Relatório Central de Integração do S{N}
  - **Critérios de Aceite**:
    - Dado a finalização da última Tarefa Produtiva
    - Quando o robô cruzar as validações oficiais e de QA unitárias
    - Então as falhas viraram correção para T-Bugs, se passar, encerra formalmente os trabalhos do Sprint.
  - **Instruções de Verificação**: Aplicar a Regras de Saída da Macro tabela
  - **Estimativa de Tempo (H)**: 2-4h
  - **Dependência**: Todos de T{N} a T{N+K} do próprio S{N}
```

> Sem que a INT daquele marco de Sprint passe no veredito limpo, o trabalho e relatórios não devem fechar.

---

## Step 4: Analise da Teia de Dependências (Dependency Analysis) 🕸️

**Objetivo**: Imprimir via Código um diagrama de setas usando formato Mermaid

```mermaid
graph TD
    T1.1.1[Configuracoes Gerais] --> T2.1.1[Criar BD User]
    T2.1.1 --> T3.1.1[Construir Formulario Front]
    T1.2.1[Migration Postgres] --> T2.1.1
```

**Local de Inserção Gráfica**: Cole isso puramente não como código-sujo mas como gráfico interpretado bem no *Início de Resumo* em `{TARGET_DIR}/05_TASKS.md` antes da listagem WBS.

---

## Step 5: Auditoria do Tamanho Operacional (Complexity Guard) 🛡️

Acenda a "luz vermelha" da skill `complexity-guard` e faça-a validar se:
- Tem alguma T{x} demorando mais de 8h? (Quebrar e Fatiar com Urgência)
- Alguma teia passa de Nível 5 Vertical?
- Existe um Paradoxo Sem Fim? (T1 depende do Output de T2 que depende do Output do T1).

---

## Step 6: Gravação Terminal na Base Documental 💾

**Objetivo**: Atualizar o Status Final do AGENTS para referenciar formalmente essa execução via log.

1.  **Salvamento Efetivo**: Fazer commit interno para `genesis/v{N}/05_TASKS.md`
2.  **Validação Estrutural Lógica**: Relê e assegura do início ao fim a formatação do template de Task requerido
3.  **Gravação no `.agent/rules/agents.md` "Status e Atividades Atuais"**:
    - A partir de agora, o Active Task List do agente apontará para `genesis/v{N}/05_TASKS.md`
    - Date Mark: Editada `{Mês, Dia, Ano}`.
    - E o mais importante: Você escreverá um sumário rápido final para que a execução futura via comando `/forge` possa puxar a corda e inciar as ações com tração direto nas *Primeiras Ondas (Wave 1)*. (Escreva nesse padrão logo abaixo em `agents.md`).
    ```markdown
    ### 🌊 Wave 1 Recomendada Inicial — {Meta inicial de vida da S1}
    Tarefas Prontas Para o Desenvolvedor Rodar no /forge: T{X.Y.Z}, T{X.Y.Z}, T{X.Y.Z}
    ```

---

## Checklist Formal de Conclusão do Blueprint ✅
- ✅ Sprints estão nomeados, temporizados, integrados ao final com INT?
- ✅ 05_TASKS.md armazena a totalidade do esforço do projeto?
- ✅ Sem exceção de tarefas, todas apresentam os Critérios de Aceite limpos de entender?
- ✅ Os Input -> Output de quem depende está nominalmente escrito (Rastreamento Funcional)?
- ✅ Um diagrama maravilhoso de setas de passos usando Diagrama Mermaid?
- ✅ Os arquivos centrais `agents.md` com suas Ondas foram postos a salvos ?

---

## Step 7: Feedback e Output Final de Verificação (Ao Usuário Humano) 🗣️

**Emita ao Desenvolvedor sua tela de sucesso das análises**:
```markdown
✅ E a Magia Aconteceu! Desmontagem (Blueprint) Construida com Sucesso!

📊 Resumo Dinâmico do Projeto de Tarefas:
  - Esforço Bruto Total de Tarefas: {N}
  - Peso 0 (Urgente): {X}
  - Peso 1 (Alta): {Y}
  - Peso 2 (Secundária): {Z}
  - Horímetro Estimado Aproximado: {T} Horas.

📁 Lista Puxada das Pranchetas e enviada para: `{TARGET_DIR}/05_TASKS.md`

📋 O Que Fazemos Agora:
  1. Revisão Lógica Mestra. Assumir que as P0 Iniciais estão na mira do canhão.
  2. Chamamos os tratores para o campo! Ative o sistema executor principal através do comando operacional a nossa disposição para converter documento na base de código do zero absoluto ao gol através do workflow (ex. /forge).
```

---

<completion_criteria>
- ✅ Confirmou versão Base Oficial da estrutura: `v{N}`
- ✅ Criou o Arquivo Geral das Listas: `05_TASKS.md`
- ✅ Aplicou Validação de Check Completo Nível 3 Listado
- ✅ Verificações de inputs (Dependência limpa e fechada)
- ✅ Validou fechamento INT
- ✅ Mermaid Renderizado
- ✅ Agente mestre de sistema (`Agents.md`) sofreu update
- ✅ Usuário em tela disse Sim.
</completion_criteria>