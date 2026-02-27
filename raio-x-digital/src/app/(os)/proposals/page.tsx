import { getProposals } from "@/features/proposals/actions/get_proposals";
import { Plus, Search, FileText, ExternalLink, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Helper component for status badge
function StatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, string> = {
        draft: "bg-neutral-800 text-neutral-300 border-neutral-700",
        sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        approved: "bg-green-500/10 text-green-400 border-green-500/20",
        rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    const style = statusStyles[status] || statusStyles.draft;

    const labels: Record<string, string> = {
        draft: "Rascunho",
        sent: "Enviada",
        approved: "Aprovada",
        rejected: "Rejeitada",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
            {labels[status] || status}
        </span>
    );
}

export default async function ProposalsDashboard() {
    const proposals = await getProposals();

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Grooway Proposals
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">
                        Gestão inteligente de propostas comerciais premium
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* We will implement the New Proposal button logic in Phase 2 */}
                    <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm">
                        <Plus className="w-4 h-4" />
                        Nova Proposta
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proposals.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 text-center rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-neutral-500" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Nenhuma proposta encontrada</h3>
                        <p className="text-neutral-400 text-sm max-w-sm">
                            Você ainda não criou nenhuma proposta comercial. Inicie pelo Auditor ou crie uma do zero.
                        </p>
                    </div>
                ) : (
                    proposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="flex flex-col p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/50 hover:bg-white/[0.08] transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <StatusBadge status={proposal.status} />
                                <div className="flex items-center gap-2 text-neutral-500 text-xs">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDistanceToNow(new Date(proposal.created_at), { addSuffix: true, locale: ptBR })}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-white line-clamp-1 mb-1 group-hover:text-purple-400 transition-colors">
                                    {proposal.client_company || proposal.client_name}
                                </h3>
                                <p className="text-sm text-neutral-400 mb-4 line-clamp-1">
                                    Responsável: {proposal.client_name}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
                                        <Eye className="w-4 h-4" />
                                        <span>0 views</span>
                                    </button>
                                </div>

                                <Link
                                    href={`/proposals/${proposal.id}`}
                                    className="flex items-center justify-center p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white hover:bg-purple-600 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
