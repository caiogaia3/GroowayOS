"use client";

import { useState } from "react";
import { ServiceCatalogItem } from "@/features/proposals/lib/types";
import { Plus, Edit2, Trash2, Power, MoreVertical, Search, Save, X } from "lucide-react";
import { upsertService, deleteService } from "@/features/proposals/actions/update_catalog";

type CatalogClientProps = {
    initialCatalog: ServiceCatalogItem[];
};

export default function CatalogClient({ initialCatalog }: CatalogClientProps) {
    const [catalog, setCatalog] = useState<ServiceCatalogItem[]>(initialCatalog);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<ServiceCatalogItem> | null>(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredCatalog = catalog.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (item: ServiceCatalogItem) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setEditingItem({
            name: "",
            category: "Marketing",
            description: "",
            pricing_type: "fixed",
            base_price: 0,
            is_active: true,
            sort_order: catalog.length * 10,
            deliverables: []
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

        setLoading(true);
        const result = await deleteService(id);
        if (result.success) {
            setCatalog(catalog.filter(c => c.id !== id));
        } else {
            alert("Erro ao excluir: " + result.error);
        }
        setLoading(false);
    };

    const handleToggleActive = async (item: ServiceCatalogItem) => {
        setLoading(true);
        const updated = { ...item, is_active: !item.is_active };
        const result = await upsertService(updated);

        if (result.success && result.data) {
            setCatalog(catalog.map(c => c.id === item.id ? result.data as ServiceCatalogItem : c));
        } else {
            alert("Erro ao atualizar status: " + result.error);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem?.name || !editingItem?.category) {
            alert("Preencha o nome e a categoria.");
            return;
        }

        setLoading(true);
        const result = await upsertService(editingItem);
        if (result.success && result.data) {
            if (editingItem.id) {
                setCatalog(catalog.map(c => c.id === editingItem.id ? result.data as ServiceCatalogItem : c));
            } else {
                setCatalog([...catalog, result.data as ServiceCatalogItem]);
            }
            setIsEditing(false);
            setEditingItem(null);
        } else {
            alert("Erro ao salvar: " + result.error);
        }
        setLoading(false);
    };

    const handleDeliverablesChange = (val: string) => {
        if (!editingItem) return;
        const arr = val.split('\n').map(s => s.trim()).filter(Boolean);
        setEditingItem({ ...editingItem, deliverables: arr });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`col-span-1 lg:col-span-3 ${isEditing ? 'lg:col-span-2 hidden lg:block' : ''}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Buscar serviços..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    {!isEditing && (
                        <button
                            onClick={handleCreate}
                            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Serviço
                        </button>
                    )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white/[0.02] border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-medium text-neutral-400">Serviço / Categoria</th>
                                <th className="px-6 py-4 font-medium text-neutral-400">Preço (R$)</th>
                                <th className="px-6 py-4 font-medium text-neutral-400">Status</th>
                                <th className="px-6 py-4 font-medium text-neutral-400 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredCatalog.map(item => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{item.name}</div>
                                        <div className="text-xs text-neutral-500 mt-0.5">{item.category}</div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-300">
                                        {item.pricing_type === 'monthly' ? 'Mensal' : item.pricing_type === 'fixed' ? 'Fixo' : 'Por unidade'}
                                        {item.base_price ? ` • R$ ${item.base_price.toLocaleString('pt-BR')}` : ''}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleActive(item)}
                                            disabled={loading}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${item.is_active
                                                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                                }`}
                                        >
                                            <Power className="w-3 h-3" />
                                            {item.is_active ? 'Ativo' : 'Inativo'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                disabled={loading}
                                                className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCatalog.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                                        Nenhum serviço encontrado no catálogo.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Editor Sidebar */}
            {isEditing && editingItem && (
                <div className="col-span-1 border border-white/10 bg-white/5 backdrop-blur-md rounded-xl p-6 h-fit sticky top-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                        <h3 className="font-bold text-lg text-white">
                            {editingItem.id ? 'Editar Serviço' : 'Novo Serviço'}
                        </h3>
                        <button
                            onClick={() => { setIsEditing(false); setEditingItem(null); }}
                            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Nome do Serviço *</label>
                            <input
                                type="text"
                                required
                                value={editingItem.name || ""}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Categoria *</label>
                                <input
                                    type="text"
                                    required
                                    value={editingItem.category || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Ex: Tráfego, Automação"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Ordem de Exibição</label>
                                <input
                                    type="number"
                                    value={editingItem.sort_order || 0}
                                    onChange={(e) => setEditingItem({ ...editingItem, sort_order: Number(e.target.value) })}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Descrição Curta</label>
                            <textarea
                                rows={2}
                                value={editingItem.description || ""}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tipo de Preço</label>
                                <select
                                    value={editingItem.pricing_type || "fixed"}
                                    onChange={(e) => setEditingItem({ ...editingItem, pricing_type: e.target.value as any })}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="fixed">Fixo (Único)</option>
                                    <option value="monthly">Mensalidade</option>
                                    <option value="per_unit">Por Unidade/Hora</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Preço Base (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={editingItem.base_price || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, base_price: parseFloat(e.target.value) || null })}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Entregáveis (1 por linha)</label>
                            <textarea
                                rows={4}
                                value={Array.isArray(editingItem.deliverables) ? editingItem.deliverables.join('\n') : ''}
                                onChange={(e) => handleDeliverablesChange(e.target.value)}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none font-mono text-xs"
                                placeholder="- Setup de campanha&#10;- Relatório semanal"
                            />
                        </div>

                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={editingItem.is_active || false}
                                onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                                className="w-4 h-4 rounded border-white/20 bg-neutral-900 text-purple-600 focus:ring-purple-600 focus:ring-offset-neutral-900"
                            />
                            <span className="text-sm font-medium text-neutral-300">Serviço Ativo</span>
                        </label>

                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setEditingItem(null); }}
                                className="flex-1 px-4 py-2 rounded-lg font-medium text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                            >
                                {loading ? 'Salvando...' : <><Save className="w-4 h-4" /> Salvar</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
