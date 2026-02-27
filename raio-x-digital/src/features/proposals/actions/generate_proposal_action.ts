"use server"

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { ServiceCatalogItem, Proposal, ProposalVersion } from "../lib/types";
import { randomBytes } from "crypto";

// Schema as defined in the PRD
const PROMPT_TEMPLATE = `
Você é o Diretor Comercial e Estrategista Chefe (CMO) da GROOWAY, uma agência premium de marketing digital e tecnologia.
Sua missão é criar uma Proposta Comercial Irresistível e de Alto Valor para o cliente baseado nos dados do Diagnóstico (Raio-X Digital) realizado e no Catálogo de Serviços disponível.

=== CONTEXTO DA EMPRESA E DIAGNÓSTICO ===
Empresa: {company_name}
URL: {target_url}

=== DORES E ACHADOS DO DIAGNÓSTICO ===
{diagnostic_summary}

=== CATÁLOGO DE SERVIÇOS (PRATELEIRA) ===
Estes são os serviços que você pode vender. Escolha estrategicamente APENAS os serviços (de 2 a 5) que resolvem as piores dores apontadas acima.
{service_catalog}

=== REGRAS DESTRUTIVAS ===
1. Você DEVE retornar ESTRITAMENTE um objeto JSON válido. Responda apenas com o JSON, sem marcações markdown como \`\`\`json.
2. O tom da proposta deve ser consultivo e provocativo (não vendemos anúncios, vendemos ecossistemas, dados, transparência e segurança).
3. Seja cirúrgico: conecte a dor mapeada com o serviço ofertado.
4. Para serviços escolhidos, utilize exatamente o nome e os preços (se o preço no catálogo for nulo, omita a chave price ou coloque "Sob Consulta").

=== JSON SCHEMA OBRIGATÓRIO ===
{
  "header": {
    "client_name": "Nome do contato (ou 'Diretoria' se não houver)",
    "client_company": "Nome da Empresa",
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

export async function generateProposalFromDiagnostic(reportId: string): Promise<Proposal | null> {
    const supabase = await createClient();

    // 1. Fetch Report
    const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single();

    if (reportError || !reportData) {
        console.error("Error fetching report:", reportError);
        return null;
    }

    // 2. Fetch Active Catalog
    const { data: catalogData, error: catalogError } = await supabase
        .from('service_catalog')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (catalogError || !catalogData) {
        console.error("Error fetching catalog:", catalogError);
        return null; // A proposta precisa do catálogo
    }

    const reportJson = reportData.data;
    const companyName = reportJson.company_name || 'Cliente';
    const targetUrl = reportJson.target_url || 'N/A';

    // Resume report to avoid gigantic contexts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leanReport = reportJson.skills_results?.map((skill: any) => ({
        agente: skill.name,
        nota: skill.score,
        dores_criticas: skill.critical_pains,
        descobertas: skill.findings
    })) || [];

    // Filter catalog to send lean version
    const leanCatalog = catalogData.map((s: ServiceCatalogItem) => ({
        id: s.id,
        category: s.category,
        name: s.name,
        pricing: s.pricing_type,
        base_price: s.base_price,
        description: s.description
    }));

    // 3. Prepare AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada.");
        return null;
    }
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const promptText = PROMPT_TEMPLATE
        .replace('{company_name}', companyName)
        .replace('{target_url}', targetUrl)
        .replace('{diagnostic_summary}', JSON.stringify(leanReport))
        .replace('{service_catalog}', JSON.stringify(leanCatalog, null, 2));

    let createdProposal: Proposal | null = null;

    try {
        console.log("Acionando Gemini (Node.js SDK) para gerar a Proposta Completa...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptText,
            config: {
                // responseMimeType: "application/json", // Gemini SDK occasionally fails if the schema isn't fully defined via API objects, so string parsed is safer for complex structures
                temperature: 0.4
            }
        });

        if (response.text) {
            let jsonText = response.text.trim();
            // In case model returns markdown block despite prompt 
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/^```json/g, '').replace(/```$/g, '').trim();
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/^```/g, '').replace(/```$/g, '').trim();
            }

            const generatedContent = JSON.parse(jsonText);

            // 4. Create DB Records
            const shareToken = generateShareToken();
            const slug = generateSlug(companyName);

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // Default validity

            const { data: newProposal, error: proposalError } = await supabase
                .from('proposals')
                .insert({
                    slug,
                    client_name: generatedContent.header?.client_name || companyName,
                    client_company: generatedContent.header?.client_company || companyName,
                    source: 'diagnostic',
                    report_id: reportId,
                    status: 'draft',
                    current_version: 1,
                    validity_days: 7,
                    expires_at: expiresAt.toISOString(),
                    share_token: shareToken
                })
                .select('*')
                .single();

            if (proposalError || !newProposal) {
                console.error("Failed to insert proposal:", proposalError);
                return null;
            }

            const { error: versionError } = await supabase
                .from('proposal_versions')
                .insert({
                    proposal_id: newProposal.id,
                    version: 1,
                    content: generatedContent,
                    change_note: 'Proposta inicial gerada por IA a partir do diagnóstico.'
                });

            if (versionError) {
                console.error("Failed to insert proposal version:", versionError);
                // We should ideally rollback or handle this, but for MVP we log
            }

            createdProposal = newProposal as Proposal;
        }
    } catch (error) {
        console.error("Erro na SDK do Gemini ou no Supabase:", error);
    }

    return createdProposal;
}
