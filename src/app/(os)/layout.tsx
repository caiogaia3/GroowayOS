import { Sidebar } from "@/core/components/Sidebar";
import { ShellHeader } from "@/core/components/ShellHeader";
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
        <div className="flex h-screen w-full overflow-hidden liquid-mesh text-slate-100">
            {/* Sidebar (Navigation) */}
            <Sidebar />

            {/* Main Application Area */}
            <main className="flex-1 flex flex-col min-w-0 ml-20 md:ml-20">
                <ShellHeader />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-12">
                    <div className="min-h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
