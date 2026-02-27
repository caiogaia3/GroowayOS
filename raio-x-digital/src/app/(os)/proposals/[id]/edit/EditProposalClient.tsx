"use client"

import { useState } from "react";
import { Proposal, ProposalVersion } from "@/features/proposals/lib/types";
import { updateProposalContent } from "@/features/proposals/actions/update_proposal";
import { useRouter } from "next/navigation";
import { Loader2, Save, Send, CheckCircle, Eye } from "lucide-react";

interface Props {
    proposal: Proposal;
    initialVersion: ProposalVersion;
}

export default function EditProposalClient({ proposal, initialVersion }: Props) {
    const [contentStr, setContentStr] = useState(JSON.stringify(initialVersion.content, null, 2));
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSave = async (publish: boolean = false) => {
        setError('');

        let parsedContent;
        try {
            parsedContent = JSON.parse(contentStr);
        } catch (e) {
            setError('JSON Inválido. Corrija o formato antes de salvar.');
            return;
        }

        if (publish) setIsPublishing(true);
        else setIsSaving(true);

        const newStatus = publish ? 'sent' : proposal.status;

        try {
            const success = await updateProposalContent(proposal.id, proposal.current_version, parsedContent, newStatus);
            if (success) {
                if (publish) {
                    router.push(`/proposals/${proposal.id}/share`);
                } else {
                    // Recarregar a página para pegar a nova versão
                    window.location.reload();
                }
            } else {
                setError('Erro interno ao salvar proposta.');
            }
        } catch (e) {
            setError('Erro ao salvar.');
        } finally {
            setIsSaving(false);
            setIsPublishing(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-5xl mx-auto w-full min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white">Editor de Proposta</h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-white/5 border-white/10 text-slate-300">
                            Versão {proposal.current_version}
                        </span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-1">
                        Cliente: <span className="text-white font-medium">{proposal.client_company || proposal.client_name}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => window.open(`/p/${proposal.slug}?t=${proposal.share_token}`, '_blank')}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving || isPublishing}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Salvar Rascunho
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={isSaving || isPublishing}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                    >
                        {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Publicar
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex-1 w-full bg-[#0B0F19] border border-white/10 rounded-xl overflow-hidden flex flex-col">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">content.json (JSON Estruturado)</span>
                    <span className="text-xs text-yellow-500">Cuidado ao editar as chaves do JSON</span>
                </div>
                <textarea
                    value={contentStr}
                    onChange={(e) => setContentStr(e.target.value)}
                    className="w-full flex-1 min-h-[60vh] bg-transparent p-4 font-mono text-sm text-slate-300 resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-brand-purple/50 custom-scrollbar"
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
