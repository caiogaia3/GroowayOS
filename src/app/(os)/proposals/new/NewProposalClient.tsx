"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceCatalogItem } from "@/features/proposals/lib/types";
import { generateManualProposal } from "@/features/proposals/actions/generate_manual_action";
import { Loader2, Check, User, Mail, Building2, AlignLeft, Sparkles } from "lucide-react";

type Props = {
    catalog: ServiceCatalogItem[];
};

export default function NewProposalClient({ catalog }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientCompany, setClientCompany] = useState("");
    const [briefing, setBriefing] = useState("");
    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

    const toggleService = (id: string) => {
        const next = new Set(selectedServices);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setSelectedServices(next);
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName || !clientCompany || selectedServices.size === 0) {
            alert("Preencha o Nome, Empresa e selecione pelo menos 1 serviço.");
            return;
        }

        setLoading(true);
        const proposal = await generateManualProposal({
            clientName,
            clientCompany,
            clientEmail,
            briefing,
            selectedServiceIds: Array.from(selectedServices)
        });

        if (proposal) {
            router.push(`/proposals/${proposal.id}/edit`);
        } else {
            alert("Erro ao gerar proposta. Verifique os logs e a chave API do Gemini.");
            setLoading(false);
        }
    };

    // Group catalog by category
    const categories = Array.from(new Set(catalog.map(c => c.category)));

    return (
        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form Info */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                    <h2 className="text-lg font-bold text-white mb-4">Dados do Cliente</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" /> Responsável *
                            </label>
                            <input
                                type="text"
                                required
                                value={clientName}
                                onChange={e => setClientName(e.target.value)}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                placeholder="João da Silva"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5" /> Empresa *
                            </label>
                            <input
                                type="text"
                                required
                                value={clientCompany}
                                onChange={e => setClientCompany(e.target.value)}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                placeholder="Acme Corp"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5" /> Email
                            </label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={e => setClientEmail(e.target.value)}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                placeholder="joao@acme.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                                <AlignLeft className="w-3.5 h-3.5" /> Briefing / Observações
                            </label>
                            <textarea
                                value={briefing}
                                onChange={e => setBriefing(e.target.value)}
                                rows={6}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                                placeholder="Descreva o cenário atual, dores principais e o que precisa ser entregue para orientar a IA..."
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || selectedServices.size === 0 || !clientName || !clientCompany}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white p-4 rounded-xl font-bold transition-colors"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Gerando Proposta via IA...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Gerar Proposta Estratégica
                        </>
                    )}
                </button>
            </div>

            {/* Right Column: Catalog Selection */}
            <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md h-full">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-lg font-bold text-white">Serviços Propostos</h2>
                            <p className="text-sm text-neutral-400 mt-1">
                                Selecione os serviços que farão parte desta proposta. Apenas os serviços ativos estão visíveis.
                            </p>
                        </div>
                        <div className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/20 rounded-lg text-sm font-medium">
                            {selectedServices.size} selecionados
                        </div>
                    </div>

                    {categories.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500">
                            Nenhum serviço ativo encontrado no catálogo.
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {categories.map(category => (
                                <div key={category}>
                                    <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                                        {category}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {catalog.filter(c => c.category === category).map(service => {
                                            const isSelected = selectedServices.has(service.id);
                                            return (
                                                <div
                                                    key={service.id}
                                                    onClick={() => toggleService(service.id)}
                                                    className={`cursor-pointer border rounded-xl p-4 transition-all relative ${isSelected
                                                            ? 'bg-purple-600/10 border-purple-500/50'
                                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className={`font-medium pr-6 ${isSelected ? 'text-purple-300' : 'text-neutral-200'}`}>
                                                            {service.name}
                                                        </h4>
                                                        {isSelected && (
                                                            <div className="absolute top-4 right-4 text-purple-400 bg-purple-500/20 w-5 h-5 rounded-full flex items-center justify-center">
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {service.base_price ? (
                                                        <div className="text-xs font-medium text-neutral-400 mb-2">
                                                            A partir de R$ {service.base_price.toLocaleString('pt-BR')}
                                                            {service.pricing_type === 'monthly' ? '/mês' : ''}
                                                        </div>
                                                    ) : null}
                                                    {service.description && (
                                                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                                                            {service.description}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
