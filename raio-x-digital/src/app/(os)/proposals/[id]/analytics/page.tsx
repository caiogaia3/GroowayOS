import { createClient } from "@/lib/supabase/server";
import { getProposalAnalytics } from "@/features/proposals/actions/get_analytics";
import Link from "next/link";
import { ArrowLeft, Users, Eye, Clock, Download, TrendingUp } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function ProposalAnalyticsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const { data: proposal, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !proposal) {
        return <div className="p-8 text-red-500">Proposta não encontrada.</div>;
    }

    const analytics = await getProposalAnalytics(params.id);

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-5xl mx-auto w-full">
            <div>
                <Link
                    href={`/proposals/${proposal.id}/edit`}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-4 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para Editor
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            Analytics da Proposta
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1">
                            Métricas de engajamento para <span className="text-white font-medium">{proposal.client_company || proposal.client_name}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Total de Visualizações</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{analytics?.totalViews || 0}</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium">Leitores Únicos (Devices)</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{analytics?.uniqueViewers || 0}</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium">Tempo Médio na Tela</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {analytics?.averageTimeSeconds ? `${Math.floor(analytics.averageTimeSeconds / 60)}m ${analytics.averageTimeSeconds % 60}s` : '0s'}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Download className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">Downloads (PDF)</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{analytics?.pdfDownloads || 0}</div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-4">
                <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="font-bold text-white">Últimos Acessos</h3>
                </div>
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white/[0.02]">
                        <tr>
                            <th className="px-6 py-3 font-medium text-neutral-400">Quando</th>
                            <th className="px-6 py-3 font-medium text-neutral-400">Tempo Gasto</th>
                            <th className="px-6 py-3 font-medium text-neutral-400">Ação (PDF)</th>
                            <th className="px-6 py-3 font-medium text-neutral-400">Dispositivo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {analytics?.recentViews.map((view) => (
                            <tr key={view.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-white font-medium">
                                        {formatDistanceToNow(new Date(view.viewed_at), { addSuffix: true, locale: ptBR })}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {format(new Date(view.viewed_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-neutral-300">
                                    {view.time_on_page_seconds ? `${Math.floor(view.time_on_page_seconds / 60)}m ${view.time_on_page_seconds % 60}s` : 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    {view.downloaded_pdf ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                                            Baixou PDF
                                        </span>
                                    ) : '-'}
                                </td>
                                <td className="px-6 py-4 text-neutral-400 text-xs truncate max-w-[200px]" title={view.user_agent}>
                                    {view.user_agent?.substring(0, 40)}...
                                </td>
                            </tr>
                        ))}
                        {(!analytics?.recentViews || analytics.recentViews.length === 0) && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                                    Nenhum acesso registrado ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
