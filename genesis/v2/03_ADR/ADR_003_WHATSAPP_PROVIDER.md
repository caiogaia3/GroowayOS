# ADR-003: Seleção do Provedor de Integração WhatsApp

## Status
Accepted

## Contexto
O GroowayOS precisa disparar mensagens de diagnóstico e propostas via WhatsApp de forma programática. Existem três caminhos principais:
1. **Twilio (API Oficial)**: Extremamente caro, exige aprovação rigorosa de templates e não permite "venda ativa" livre (prospecção).
2. **Evolution API (API de Instância)**: Open-source, permite conectar números reais via QR Code, oferece estabilidade e controle total sobre o envio de mídia.
3. **WPPConnect/Baileys (Biblioteca Pura)**: Baixo nível, exige gerir toda a lógica de reconexão e socket manualmente.

## Decisão
Utilizaremos a **Evolution API** como nossa ponte de mensageria.

## Justificativa
- **Versatilidade**: Permite o envio de links e PDFs sem a necessidade de aprovação prévia de templates pela Meta.
- **Integração**: Possui webhooks nativos altamente detalhados (envio, entrega, leitura).
- **Custo**: Pode ser hospedada pelo usuário em um Docker container separado, reduzindo custos de API por mensagem.
- **Escalabilidade**: Suporta múltiplas instâncias no mesmo servidor se necessário no futuro.

## Consequências
- **Positivas**: Agilidade no envio; controle total do status da mensagem; suporte nativo a botões e listas.
- **Negativas**: O usuário precisa manter o container da Evolution API rodando; risco de banimento se o número for mal utilizado (requer lógica de delay no OS).

---
**Autor**: Genesis Engine (Antigravity)
