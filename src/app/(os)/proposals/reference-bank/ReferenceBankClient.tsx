"use client";

import { useState } from "react";
import { Proposal } from "@/features/proposals/lib/types";
import { instantiateTemplate } from "@/features/proposals/actions/update_proposal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, CopyPlus, Eye } from "lucide-react";

type Props = {
    templates: Proposal[];
};

export default function ReferenceBankClient({ templates }: Props) {
    const router = useRouter();
    const [selectedTemplate, setSelectedTemplate] = useState<Proposal | null>(null);
    const [clientName, setClientName] = useState('');
    const [clientCompany, setClientCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInstantiate = async () => {
        if (!selectedTemplate || !clientName || !clientCompany) {
            setError("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError('');

        const newProposalId = await instantiateTemplate(selectedTemplate.id, clientName, clientCompany);

        if (newProposalId) {
            router.push(`/proposals/${newProposalId}/edit`);
        } else {
            setError("Erro ao criar proposta a partir do modelo.");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="flex flex-col p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-white mb-1">
                                {template.template_name}
                            </h3>
                            <Link
                                href={`/proposals/${template.id}/edit`}
                                className="text-amber-500/50 hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all"
                                title="Editar Modelo em si"
                            >
                                <Eye className="w-4 h-4" />
                            </Link>
                        </div>
                        <p className="text-xs text-neutral-500 mb-4 line-clamp-2">
                            Base original: {template.client_company || template.client_name}
                        </p>

                        <div className="mt-auto pt-4 border-t border-amber-500/10">
                            <button
                                onClick={() => setSelectedTemplate(template)}
                                className="flex items-center justify-center gap-2 w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-sm font-medium rounded-lg transition-colors"
                            >
                                <CopyPlus className="w-4 h-4" />
                                Usar Modelo
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-md p-6 overflow-hidden relative">
                        <h3 className="text-xl font-bold text-white mb-2">Novo a partir de Modelo</h3>
                        <p className="text-sm text-neutral-400 mb-6">
                            Modelo: <span className="text-amber-400 font-medium">{selectedTemplate.template_name}</span>
                        </p>

                        {error && (
                            <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Novo Cliente / Responsável *</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                                    placeholder="Ex: João da Silva"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Nova Empresa *</label>
                                <input
                                    type="text"
                                    value={clientCompany}
                                    onChange={(e) => setClientCompany(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                                    placeholder="Ex: Acme Corp"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    setSelectedTemplate(null);
                                    setClientName('');
                                    setClientCompany('');
                                    setError('');
                                }}
                                disabled={loading}
                                className="flex-1 px-4 py-2 rounded-lg font-medium text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleInstantiate}
                                disabled={loading || !clientName || !clientCompany}
                                className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CopyPlus className="w-4 h-4" />}
                                Criar Proposta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
