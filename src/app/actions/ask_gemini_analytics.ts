"use server";

import { GoogleGenAI } from "@google/genai";

export async function askGeminiAnalytics(query: string, metricsData: any) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("GEMINI_API_KEY não configurada.");
        return { success: false, error: "API Key não configurada" };
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Você é uma IA nativa de Business Intelligence integrada ao GroowayOS (Agência).
O usuário (Dono da agência ou Gestor de Tráfego) está analisando os dados atuais do cliente e fez a seguinte pergunta:
"${query}"

============== DADOS ATUAIS EM TEMPO REAL =================
${JSON.stringify(metricsData, null, 2)}
===========================================================

REGRAS DE RESPOSTA:
1. Responda DIRETAMENTE a pergunta de forma analítica e estratégica.
2. Use tom de consultor focado em métricas.
3. Se o usuário pedir um novo widget ou formato, apenas diga que "No futuro próximo habilitaremos o drag & drop de novos widgets com base nessa métrica" e mantenha o foco na resposta numérica.
4. Responda em texto limpo com quebras de linha ou bullet points. 
5. Seja incisivo, rápido e não invente dados além do fornecido no JSON.
`;

    try {
        console.log("[ServerAction] Iniciando Request para o Gemini na aba Analytics...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                temperature: 0.3,
            },
        });

        return {
            success: true,
            text: response.text
        };

    } catch (error: any) {
        console.error("[ServerAction] Erro no Gemini Analytics:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
