import { Activity, Target, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">Visão geral do GroowayOS e métricas da agência.</p>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Leads Prospectados", value: "142", icon: Users, color: "text-blue-400" },
                    { label: "Auditorias (X-Ray)", value: "28", icon: Target, color: "text-brand-purple" },
                    { label: "Taxa de Conversão", value: "12%", icon: Activity, color: "text-spring-green-400" },
                    { label: "MRR (Fee Mensal)", value: "R$ 45.200", icon: TrendingUp, color: "text-brand-cyan" },
                ].map((stat, i) => (
                    <div key={i} className="liquid-glass p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                            <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Modules Quick Access */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Onboarding Genesis */}
                <div className="liquid-glass p-8 rounded-3xl relative overflow-hidden group cursor-pointer border-brand-purple/20 hover:border-brand-purple/50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 blur-[50px] rounded-full group-hover:bg-brand-purple/40 transition-colors"></div>
                    <h3 className="text-xl font-bold text-white mb-2">Fluxo Genesis</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-sm">
                        Inicie o onboarding automatizado de um novo cliente. Integração total com Google Drive e CRM.
                    </p>
                    <button className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors">
                        Iniciar Onboarding
                    </button>
                </div>

                {/* Auditor Estratégico */}
                <div className="liquid-glass p-8 rounded-3xl relative overflow-hidden group cursor-pointer border-brand-cyan/20 hover:border-brand-cyan/50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 blur-[50px] rounded-full group-hover:bg-brand-cyan/40 transition-colors"></div>
                    <h3 className="text-xl font-bold text-white mb-2">Auditor Estratégico</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-sm">
                        Gere relatórios automatizados de posicionamento digital para apresentar aos seus leads.
                    </p>
                    <a href="/auditor" className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-medium text-sm hover:opacity-90 transition-opacity">
                        Nova Auditoria
                    </a>
                </div>
            </div>
        </div>
    );
}
