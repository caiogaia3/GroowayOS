"use server"

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { ServiceCatalogItem, Proposal } from "../lib/types";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";

const PROMPT_TEMPLATE = `
Você é o Diretor Comercial e Estrategista Chefe (CMO) da GROOWAY, uma agência premium de marketing digital e tecnologia.
Sua missão é criar uma Proposta Comercial Irresistível e de Alto Valor para o cliente baseado no Briefing/Observações e nos Serviços Selecionados.

=== CONTEXTO DO CLIENTE ===
Empresa: {company_name}
Contato: {client_name}
Email: {client_email}

=== BRIEFING / OBSERVAÇÕES ===
{briefing}

=== SERVIÇOS SELECIONADOS NO CATÁLOGO ===
Concentre a proposta ESTRITAMENTE nesses serviços e como eles resolvem o que foi pedido no briefing.
{selected_services}

=== REGRAS DESTRUTIVAS ===
1. Você DEVE retornar ESTRITAMENTE um objeto JSON válido. Responda apenas com o JSON, sem marcações markdown como \`\`\`json.
2. O tom da proposta deve ser consultivo e provocativo (não vendemos anúncios, vendemos ecossistemas, dados, transparência e segurança).
3. Seja cirúrgico: conecte o briefing com os serviços ofertados.
4. Utilize ESTRITAMENTE as informações enviadas (nome, preços). Se o preço for nulo, omita a chave price ou coloque "Sob Consulta".

=== JSON SCHEMA OBRIGATÓRIO ===
{
  "header": {
    "client_name": "{client_name}",
    "client_company": "{company_name}",
    "proponent": "Caio Gaia | Grooway",
    "scope_headline": "Linha de escopo. Ex: Máquina de Vendas B2B, Inteligência de Dados & Automação com IA"
  },
  "sections": [
    {
      "type": "concept",
      "title": "1. O Conceito: Tecnologia a Serviço da Confiança",
      "content": "2 a 3 parágrafos consultivos sobre o momento atual do mercado deles, o gargalo que encontramos, e como a Grooway muda o jogo focado em performance e IA."
    },
    {
      "type": "strategy_pillars",
      "title": "2. Pilares da Estratégia",
      "intro": "Nossa atuação será baseada em...",
      "pillars": [
        { "icon": "search", "title": "Aquisição de Demanda", "description": "..." },
        { "icon": "brain", "title": "Autoridade Automática", "description": "..." },
        { "icon": "chart", "title": "Transparência Total", "description": "..." }
      ]
    },
    {
      "type": "modules",
      "title": "3. Escopo de Entrega (Módulos Integrados)",
      "modules": [
        {
          "name": "Nome do Módulo (ex: Performance B2B & Business Intelligence)",
          "description": "Texto curto.",
          "items": [
            { "icon": "check", "label": "Nome do Serviço", "detail": "O que faremos e o impacto" }
          ]
        }
      ]
    },
    {
      "type": "investment",
      "title": "4. Investimento e Condições",
      "cards": [
        { 
          "label": "VALOR ÚNICO | RECORRÊNCIA MENSAL", 
          "title": "Setup & Implementação", 
          "price": 1600, 
          "recurrence": "fixed", 
          "items": ["Criação da Landing Page", "Configuração de Tracking"] 
        }
      ]
    },
    {
      "type": "timeline",
      "title": "5. Cronograma de Implementação",
      "stages": [
        { "name": "Kick-off", "action": "Reunião de alinhamento e coleta de acessos.", "deadline": "Dia 1-5" },
        { "name": "Setup", "action": "Implementação técnica e criativos.", "deadline": "Semana 1-2" }
      ]
    },
    {
      "type": "validity",
      "title": "6. Validade e Próximos Passos",
      "validity_days": 7,
      "steps": [
        { "icon": "check", "label": "Aceite Formal", "detail": "Confirmação por WhatsApp ou E-mail." },
        { "icon": "check", "label": "Kick-off", "detail": "Agendamento da reunião." }
      ],
      "cta": "Vamos escalar. →"
    }
  ]
}
`;

function generateSlug(companyName: string) {
    const baseSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const randomSuffix = randomBytes(3).toString('hex');
    return `${baseSlug}-${randomSuffix}`;
}

function generateShareToken() {
    return randomBytes(16).toString('hex');
}

export type ManualProposalInput = {
    clientName: string;
    clientCompany: string;
    clientEmail: string;
    briefing: string;
    selectedServiceIds: string[];
};

export async function generateManualProposal(input: ManualProposalInput): Promise<Proposal | null> {
    const supabase = await createClient();

    // 1. Fetch Selected Services
    const { data: catalogData, error: catalogError } = await supabase
        .from('service_catalog')
        .select('*')
        .in('id', input.selectedServiceIds);

    if (catalogError || !catalogData) {
        console.error("Error fetching catalog for manual proposal:", catalogError);
        return null;
    }

    const leanCatalog = catalogData.map((s: ServiceCatalogItem) => ({
        id: s.id,
        category: s.category,
        name: s.name,
        pricing: s.pricing_type,
        base_price: s.base_price,
        description: s.description,
        deliverables: s.deliverables
    }));

    // 2. Prepare AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada.");
        return null;
    }
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const promptText = PROMPT_TEMPLATE
        .replace(/{company_name}/g, input.clientCompany || 'Cliente')
        .replace(/{client_name}/g, input.clientName || 'Contato')
        .replace(/{client_email}/g, input.clientEmail || 'N/A')
        .replace('{briefing}', input.briefing || 'Nenhum briefing fornecido.')
        .replace('{selected_services}', JSON.stringify(leanCatalog, null, 2));

    let createdProposal: Proposal | null = null;

    try {
        console.log("Acionando Gemini (Node.js SDK) para gerar a Proposta Manual Completa...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptText,
            config: {
                temperature: 0.4
            }
        });

        if (response.text) {
            let jsonText = response.text.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/^```json/g, '').replace(/```$/g, '').trim();
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/^```/g, '').replace(/```$/g, '').trim();
            }

            const generatedContent = JSON.parse(jsonText);

            // 3. Create DB Records
            const shareToken = generateShareToken();
            const slug = generateSlug(input.clientCompany || 'empresa');

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // Default validity

            const { data: newProposal, error: proposalError } = await supabase
                .from('proposals')
                .insert({
                    slug,
                    client_name: input.clientName,
                    client_company: input.clientCompany,
                    client_email: input.clientEmail,
                    source: 'manual',
                    report_id: null,
                    status: 'draft',
                    current_version: 1,
                    validity_days: 7,
                    expires_at: expiresAt.toISOString(),
                    share_token: shareToken
                })
                .select('*')
                .single();

            if (proposalError || !newProposal) {
                console.error("Failed to insert manual proposal:", proposalError);
                return null;
            }

            const { error: versionError } = await supabase
                .from('proposal_versions')
                .insert({
                    proposal_id: newProposal.id,
                    version: 1,
                    content: generatedContent,
                    change_note: 'Proposta inicial gerada manualmente via assistente de IA.'
                });

            if (versionError) {
                console.error("Failed to insert manual proposal version:", versionError);
            }

            createdProposal = newProposal as Proposal;
            revalidatePath('/proposals');
        }
    } catch (error) {
        console.error("Erro na SDK do Gemini ou no Supabase para Proposta Manual:", error);
    }

    return createdProposal;
}
