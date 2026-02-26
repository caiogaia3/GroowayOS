"use server";

import { PythonReport } from "./run_python";

export interface ValuePropositionData {
    titulo_proposta: string;
    frase_gancho: string;
    diagnostico_resumido: string;
    proposta_valor_grooway: string;
    por_que_agora: string;
    provas_sociais_placeholder: string[];
    servicos_propostos: {
        nome: string;
        descricao: string;
        resultado_esperado: string;
        urgencia: string;
    }[];
    investimento_estimado: string;
    proximo_passo: string;
    assinatura_consultor: string;
}

/**
 * Extracts the value proposition data from the Python orchestrator report.
 * The ValuePropositionAgent runs as the last skill in the Python pipeline
 * and outputs data directly in the skills_results array.
 */
export async function getValuePropositionFromReport(
    report: PythonReport
): Promise<ValuePropositionData | null> {
    const vpSkill = report.skills_results.find(
        (s) => s.name === "Value Proposition Agent (Grooway)"
    );

    if (!vpSkill || !vpSkill.findings) {
        return null;
    }

    const f = vpSkill.findings;
    if (!f.titulo_proposta) {
        return null;
    }

    return f as ValuePropositionData;
}
