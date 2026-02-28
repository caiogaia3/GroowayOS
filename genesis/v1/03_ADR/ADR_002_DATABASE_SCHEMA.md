# ADR-002: Estrutura da Base de Dados Supabase (Schema)

## Status
Accepted

## Contexto
Precisamos sair de um modelo de "arquivos JSON locais" para um banco de dados relacional que suporte busca, histórico e múltiplos usuários.

## Decisão
Utilizaremos um schema relacional clássico no Supabase com as seguintes tabelas:
- `leads`: O coração do CRM.
- `diagnostics`: O armazenamento frio dos scans técnicos (guardados como JSONB).
- `proposals`: O armazenamento de vendas (guardados como JSONB).
- `profiles`: Extensão do `auth.users` para RBAC.

## Justificativa
- **JSONB**: Permite flexibilidade total para os Agentes de IA adicionarem novos tipos de análise sem precisarmos de migrações SQL constantes.
- **Relacional**: Garante que uma proposta sempre pertença a um lead, evitado inconsistências.
- **Segurança**: Facilita o uso de RLS (Row Level Security) nativo do Supabase.

## Consequências
- **Positivas**: Histórico infinito de propostas para o usuário; API do Supabase pronta para o frontend.
- **Negativas**: Leve aumento na latência de leitura comparado a arquivos locais (irrelevante para o caso de uso).

---
**Autor**: Genesis Engine
