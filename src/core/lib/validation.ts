import { z } from 'zod';

/**
 * Schema for triggering the Python analysis
 */
export const TriggerAnalysisSchema = z.object({
    url: z.string().url("URL inválida"),
    companyName: z.string().min(2, "Nome da empresa muito curto"),
    diagnosticId: z.string().uuid("ID de diagnóstico inválido"),
    selectedAgents: z.array(z.string()).min(1, "Selecione pelo menos um agente"),
    instagram: z.string().optional(),
    city: z.string().optional(),
});

/**
 * Schema for saving a diagnostic result
 */
export const SaveDiagnosticSchema = z.object({
    companyName: z.string(),
    targetUrl: z.string().url(),
    city: z.string().optional(),
    instagram: z.string().optional(),
    reportData: z.any().optional(),
    finalScore: z.number().min(0).max(100).optional(),
    status: z.enum(['processing', 'complete', 'failed']).optional(),
});

/**
 * Schema for saving a proposal
 */
export const SaveProposalSchema = z.object({
    leadId: z.string().uuid(),
    diagnosisId: z.string().uuid(),
    contentJson: z.any(),
    status: z.enum(['draft', 'sent', 'accepted']).optional(),
});

export type TriggerAnalysisInput = z.infer<typeof TriggerAnalysisSchema>;
export type SaveDiagnosticInput = z.infer<typeof SaveDiagnosticSchema>;
export type SaveProposalInput = z.infer<typeof SaveProposalSchema>;
