"use server";

import { GoogleGenAI } from "@google/genai";
import { PythonReport } from "./run_python";

export interface ValueProposition {
    titulo: string;
    promessa_central: string;
    por_que_agora: string;
    diferenciais_grooway: string[];
    investimento_e_retorno: string;
    cta_frase: string;
}

/**
 * Gera uma Proposta de Valor da Grooway baseada no relatório de diagnóstico.
 * Esta action é um caminho alternativo (sem precisar rodar Python novamente)
 * que usa o skills_results já existente para criar a proposta via Gemini no Node.js.
 */
export async function generateValueProposition(report: PythonReport): Promise<ValueProposition | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada.");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Extrai o plano comercial do CMO se existir
    const cmoSkill = report.skills_results.find(
        (s) => s.name === "Senior CMO Agent (Business & Sales)"
    );
    const cmoVerdict = cmoSkill?.findings?.cmo_verdict || "";
    const cmoServices = cmoSkill?.findings?.plano_comercial?.servicos_recomendados || [];

    // Extrai as piores dores de todos os agentes para criar urgência real
    const allPains: string[] = [];
    const allNegatives: string[] = [];

    for (const skill of report.skills_results) {
        if (skill.critical_pains?.length) {
            allPains.push(...skill.critical_pains.slice(0, 2));
        }
        const bb = skill.boss_briefing || {};
        if (bb.pontos_negativos?.length) {
            allNegatives.push(...bb.pontos_negativos.slice(0, 2));
        }
    }

    // Manda apenas o essencial para economizar tokens
    const leanContext = {
        target_url: report.target_url,
        company_name: report.company_name,
        top_pains: [...new Set(allPains)].slice(0, 6),
        top_negatives: [...new Set(allNegatives)].slice(0, 6),
        cmo_verdict: cmoVerdict,
        recommended_services: cmoServices.map((s: { nome_servico?: string; impacto_esperado?: string }) => ({
            nome: s.nome_servico,
            impacto: s.impacto_esperado,
        })),
    };

    const prompt = `
Você é o Diretor de Crescimento da GROOWAY, uma agência premium de marketing digital.
Você acabou de entregar um diagnóstico gratuito e completo do digital da empresa "${report.company_name}" (${report.target_url}).

Com base EXCLUSIVAMENTE nos dados abaixo, crie uma PROPOSTA DE VALOR IRRESISTÍVEL:

=== CONTEXTO DO DIAGNÓSTICO ===
${JSON.stringify(leanContext, null, 2)}
===============================

REGRAS:
- Fale em Português do Brasil, tom executivo e direto.
- Use as dores encontradas para criar urgência REAL (não invente dados).
- Posicione a Grooway como solução natural e superior.
- Não mencione valores monetários (sem R$, sem preços).
- Cada campo: máximo 3 frases, direto ao ponto.

Retorne ESTRITAMENTE este JSON (sem markdown, sem crases):
{
    "titulo": "Headline cativante de 1 frase conectando o diagnóstico ao que a Grooway resolve.",
    "promessa_central": "O que a empresa vai GANHAR: mais clientes, vendas, autoridade. Baseado nos dados.",
    "por_que_agora": "Urgência real: por que esperar custa caro? Mencione o que os dados mostram.",
    "diferenciais_grooway": [
        "Diferencial 1 direto contra a maior dor encontrada.",
        "Diferencial 2 baseado nos dados.",
        "Diferencial 3 de metodologia ou velocidade.",
        "Diferencial 4 de relacionamento ou suporte."
    ],
    "investimento_e_retorno": "Posicione o investimento como decisão de crescimento, não custo.",
    "cta_frase": "Convite para conversa — sem pressão, com valor claro."
}
`;

    try {
        console.log("Gerando Proposta de Valor via Gemini (Node SDK)...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.4,
            },
        });

        if (response.text) {
            return JSON.parse(response.text) as ValueProposition;
        }
        return null;
    } catch (error) {
        console.error("Erro ao gerar Proposta de Valor:", error);
        return null;
    }
}
