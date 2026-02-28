# GroowayOS: Relatório de Desafio de Engenharia (CHALLENGE)

Este relatório desafia as decisões atuais de arquitetura e identifica pontos de falha iminente sob o ponto de vista de um Engenheiro Sênior.

## 1. Tabela de Riscos Críticos (Pre-Mortem)

| Motivo da Falha (Cenário de Desastre) | Causa Raiz (Veneno no Design) | Evidência Probatória | Severidade |
| :--- | :--- | :--- | :---: |
| **Timeout de Sessão** | Execução sequencial de 10 agentes com chamadas de rede externas somadas. | Arquivo `main.py:140` loop for síncrono. | 🔴 CRÍTICO |
| **Gargalo de Infraestrutura** | Instalação de dependências (pip) disparada por clique do usuário. | Arquivo `trigger-analysis.ts:39` `spawnSync` em runtime. | 🔴 CRÍTICO |
| **Interrupção de Fluxo** | Ausência de timeouts explícitos nas chamadas de APIs de terceiros (Apify). | `skill_google_my_business.py:92` timeout longo (55s). | 🟠 ALTO |
| **Vazamento de Chaves** | Dispersão de arquivos `.env` em múltiplas pastas. | Multiplas chamadas `load_dotenv` em caminhos variados. | 🟠 ALTO |

## 2. Auditoria Tridimensional

### 2.1 Camada de Design (Integridade)
*   **Problema:** O sistema assume que a conexão de rede será estável por 10 minutos. No Easypanel/Vercel, requisições HTTP costumam ter timeouts de 30-60s no nível de gateway.
*   **Consequência:** A análise roda no backend, mas o frontend "perde o contato" e mostra erro, embora a IA continue gastando créditos no escuro.

### 2.2 Camada de Runtime (Execução)
*   **Problema:** Uso de `time.sleep(3)` fixo entre agentes no `main.py`.
*   **Absurdo:** Em 10 agentes, perdemos 30 segundos fazendo **literalmente nada**, apenas para evitar erros que deveriam ser tratados com lógica de retentativa inteligente (backoff).

### 2.3 Camada de Engenharia (Manutenção)
*   **Problema:** Acoplamento forte entre o nome das classes Python e os IDs de aba do React.
*   **Risco:** Se renomearmos uma Skill em Python para organizar o código, a aba correspondente no Dashboard "some" ou fica vazia sem aviso prévio.

## 3. Veredito do Challenger

O sistema atual está operando sob **"Arquitetura de Espera Passiva"**. Ele funciona para um usuário por vez, mas quebrará se 5 pessoas clicarem em "Analisar" simultaneamente, pois o servidor tentará rodar 100 agentes e 5 instalações de PIP ao mesmo tempo, estourando a CPU e Memória do VPS.

---

> [!CAUTION]
> **Ação Imediata Recomendada:** Migrar para o modelo de **Coleta Paralela** e remover o loop `for` bloqueante em `main.py`.
