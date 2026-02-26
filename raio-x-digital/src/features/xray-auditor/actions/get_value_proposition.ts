"use server";

import { PythonReport } from "./run_python";

export interface ValuePropositionData {
    titulo_proposta: string;
    bloco1_apresentacao: string;
    bloco2_cenario_atual: string;
    bloco3_estrategia: string;
    bloco4_escopo: string;
    bloco5_cronograma: string;
    bloco6_resultados: string;
    bloco7_investimentos_condicoes: string;
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
