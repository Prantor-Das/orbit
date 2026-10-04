import { WorkspaceAgentsProvider } from "@/components/custom/workspace/WorkspaceAgentsProvider";
import { UI } from "@/lib/constants/ui";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import WorkspaceSidebarTrigger from "@/components/custom/workspace/WorkspaceSidebarTrigger";
import AppSidebar from "@/components/custom/workspace/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceAgentsProvider>
      <SidebarProvider
        className="h-dvh min-h-0 overflow-hidden"
        style={{ "--sidebar-width": "var(--orbit-sidebar-width)" } as CSSProperties}
      >
        <Suspense fallback={<div className="hidden w-70 shrink-0 border-r bg-sidebar md:block" />}>
          <AppSidebar />
        </Suspense>
        <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border/60 px-4 md:hidden">
            <WorkspaceSidebarTrigger className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{UI.labels.workspace}</span>
          </header>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceAgentsProvider>
  );
}
