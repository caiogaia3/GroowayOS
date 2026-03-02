"use client";

import { usePathname } from "next/navigation";

export function OSContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Automatically reduce padding if we are inside a workspace with its own secondary menu (like /crm or /hub)
    const isCollapsed = pathname.startsWith("/crm") || pathname.startsWith("/hub");
    const paddingClass = isCollapsed ? "md:pl-20" : "md:pl-64";

    return (
        <div className={`flex-1 flex flex-col min-h-screen overflow-hidden pl-20 ${paddingClass} transition-all duration-500`}>
            {children}
        </div>
    );
}
