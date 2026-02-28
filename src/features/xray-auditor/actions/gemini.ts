"use server";

import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the expected output structure from the Gemini Model
const DiagnosisSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        platformScore: {
            type: Type.INTEGER,
            description: "Score de 0 a 100 para o site, UI/UX e funil de captura. Geralmente deve ser baixo (20-60) para incentivar a venda.",
        },
        trackingScore: {
            type: Type.INTEGER,
            description: "Score de 0 a 100 para infraestrutura de dados (Analytics, Pixel). Geralmente deve ser baixo.",
        },
        brandScore: {
            type: Type.INTEGER,
            description: "Score de 0 a 100 para posicionamento de marca nas redes sociais e autoridade. Geralmente deve ser baixo.",
        },
        platformPain: {
            type: Type.STRING,
            description: "Parágrafo agressivo apontando falhas no site, falta de blog, design amador e como isso espanta clientes.",
        },
        trackingPain: {
            type: Type.STRING,
            description: "Parágrafo apontando a cegueira de dados, falta de tracking (GTM, Pixel) e como eles estão queimando dinheiro com tráfego cego.",
        },
        brandPain: {
            type: Type.STRING,
            description: "Parágrafo apontando que as redes sociais são apenas panfletagem, sem funil de vendas, perdendo audiência para a concorrência.",
        },
        proposalCopy: {
            type: Type.STRING,
            description: "Um texto de venda brutal ('Predator') conectando os 3 problemas aos nossos serviços (Gestão de Tráfego, Criação de Sites, Conteúdo e Automação).",
        },
        heroHtml: {
            type: Type.STRING,
            description: "Código HTML puro (apenas a tag <div> inicial e conteúdo interno) usando classes do Tailwind CSS representando uma Primeira Dobra (Hero Section) moderna, premium e de alta conversão para essa empresa. Use cores escuras ou neutras elegantes. NÃO ESCREVA markdown, apens o HTML.",
        },
    },
    required: [
        "platformScore",
        "trackingScore",
        "brandScore",
        "platformPain",
        "trackingPain",
        "brandPain",
        "proposalCopy",
        "heroHtml"
    ],
};

export interface DiagnosisResponse {
    platformScore: number;
    trackingScore: number;
    brandScore: number;
    platformPain: string;
    trackingPain: string;
    brandPain: string;
    proposalCopy: string;
    heroHtml: string;
}

export async function generateDiagnosis(companyName: string, url: string): Promise<DiagnosisResponse> {
    try {
        const prompt = `
      Você é o "COMMERCIAL PREDATOR" (v2.0), uma IA de Engenharia de Vendas de Elite atuando por trás de um sistema de "Raio-X Digital".
      
      Sua missão é atuar como 3 Agentes Especialistas:
      1. Auditor de Plataforma (Avalia Sites, Landing Pages e Blogs).
      2. Engenheiro de Dados (Avalia Tracking, GTM, Tráfego).
      3. Estrategista de Marca (Avalia Social Media e Autoridade).

      Analise a empresa-alvo baseando-se no nome, URL e inferências sobre o mercado dela:
      Nome/Nicho: ${companyName || 'Empresa Genérica'}
      URL: ${url}

      Entregue o diagnóstico no formato JSON solicitado. 
      Lembre-se: O objetivo final é VENDER os serviços da nossa agência (Gestão de Tráfego, Criação de Sites, Cópia/Conteúdo com IA, Automação).
      Dê notas baixas/medianas e escreva dores latentes (como "você está perdendo clientes para o concorrente", "seu CAC está sangrando porque o tracking não existe", "seu site parece de 2010").
      
      Para o 'heroHtml': Crie uma Hero Section matadora com Tailwind CSS. Seja criativo. Use gradients, tipografia forte e CTAs claros. O fundo deve ser dark (ex: bg-zinc-950). Retorne APENAS o HTML validável, sem crases na string JSON.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: DiagnosisSchema,
                temperature: 0.7,
            },
        });

        if (!response.text) {
            throw new Error("Gemini returned empty response.");
        }

        const data = JSON.parse(response.text) as DiagnosisResponse;
        return data;
    } catch (error) {
        console.error("Error generating diagnosis with Gemini:", error);
        throw new Error("Falha ao gerar o diagnóstico inteligente via IA.");
    }
}
