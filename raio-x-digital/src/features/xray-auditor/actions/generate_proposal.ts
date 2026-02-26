"use server";

import { GoogleGenAI } from "@google/genai";
import { PythonReport } from "./run_python";

export interface SuggestedService {
    nome_servico: string;
    por_que_vender: string; // Baseado na dor/evidence encontrada
    impacto_esperado: string;
}

export interface CommercialPlan {
    mensagem_abertura: string;
    servicos_recomendados: SuggestedService[];
    projecao_resultado: string;
}

export async function generateProposal(report: PythonReport): Promise<CommercialPlan | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada no provedor Node.");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Filtramos o JSON gigante para tirar ruídos pesados ou nulos e economizar contexto/tokens
    const leanReport = report.skills_results.map(skill => ({
        agente: skill.name,
        nota: skill.score,
        dores_criticas: skill.critical_pains,
        descobertas: skill.findings
    }));

    const promptText = `
    Você é um CMO Especialista em Vendas B2B High-Ticket de uma Agência de Marketing Digital Premium.
    Sua missão é ler o diagnóstico de dores técnicas (JSON) abaixo extraído de um Lead (empresa ${report.target_url}),
    e traduzir as Piores Falhas desse sistema em "Venda de Serviços".
    
    Diagnóstico Técnico da Empresa:
    ${JSON.stringify(leanReport)}
    
    Com base exclusivamente nas dores mapeadas acima (como ausência de tags, falhas na bio do instagram, SEO Local fraco ou copy inoperante) e seus respectivos arrays de 'evidences',
    monte um Plano Comercial.
    
    Retorne ESTRITAMENTE um objeto JSON neste molde, sem formatação markdown:
    {
       "mensagem_abertura": "Um gancho emocional de 2 linhas dizendo rapidamente como o diagnóstico aponta perda severa de dinheiro pra concorrência baseada nos dados dele.",
       "servicos_recomendados": [
          {
             "nome_servico": "Nome Sedutor do Serviço (Ex: Otimização de SEO Local Mapas)",
             "por_que_vender": "Justifique OBRIGATORIAMENTE citando as 'evidences' ou 'dores_criticas' lidos. Ex: 'Como a evidência aponta ausência da tag H1...'",
             "impacto_esperado": "O que acontece na prática de caixa do cliente se ele comprar, de imediato."
          },
          ... // Sugira de 2 a 4 serviços no máximo, os mais urgentes.
       ],
       "projecao_resultado": "Breve parágrafo finalizador mostrando a transformação geral se os gargalos forem resolvidos."
    }
    `;

    try {
        console.log("Acionando Gemini (Node.js SDK) para gerar o Plano Comercial...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptText,
            config: {
                responseMimeType: "application/json",
                temperature: 0.4
            }
        });

        if (response.text) {
            const parsedData = JSON.parse(response.text) as CommercialPlan;
            return parsedData;
        }
        return null;
    } catch (error) {
        console.error("Erro na SDK do Gemini ao Gerar Plano Comercial:", error);
        return null; // Silencia o throw para a UI não quebrar e mostrar state vazio.
    }
}
