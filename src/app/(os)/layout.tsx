import { Sidebar } from "@/core/components/Sidebar";
import ShellHeader from "@/core/components/ShellHeader";
import { createClient } from "@/core/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function OSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-[#020204] text-slate-100 flex selection:bg-purple-500/30 overflow-hidden">
            {/* Global Mesh Background */}
            <div className="fixed inset-0 liquid-mesh pointer-events-none -z-10" />

            {/* Navigation Layer */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen overflow-hidden pl-20 md:pl-64 transition-all duration-500">
                <ShellHeader />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {/* Page Content */}
                    <div className="p-8 md:p-12 pb-32">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
