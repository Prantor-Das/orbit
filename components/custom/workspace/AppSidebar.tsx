"use client";

import AccountDrawer from "./AccountDrawer";
import { useWorkspaceAgents } from "./WorkspaceAgentsProvider";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { UI, type SidebarAgent } from "@/lib/constants/ui";
import { UIAsset } from "@/components/custom/UIAsset";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

export default function AppSidebar({ agents: suppliedAgents }: { agents?: SidebarAgent[] }) {
  const { agents: workspaceAgents } = useWorkspaceAgents();
  const agents = suppliedAgents ?? workspaceAgents;
  const { data: session, status } = useSession();
  const params = useSearchParams();
  const pathname = usePathname();
  const isCreateAgent = pathname === UI.routes.createAgent;
  const { setOpenMobile } = useSidebar();
  const view = pathname === "/workspace" ? params.get("view") : null;
  const activeAgent = params.get("agent");
  const username =
    session?.user?.name ||
    session?.user?.email?.split("@")[0] ||
    (status === "loading" ? "Loading…" : UI.labels.fallbackUsername);
  const initials = username
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const closeMobile = () => setOpenMobile(false);
  const itemStyle =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring";

  return (
    <Sidebar className="border-sidebar-border/70" aria-label="Workspace navigation">
      <SidebarHeader className="shrink-0 gap-5 px-5 pb-5 pt-6">
        <Link
          href="/workspace"
          onClick={closeMobile}
          className="flex w-fit items-center gap-2.5 rounded-lg px-2 focus-visible:outline-2 focus-visible:outline-sidebar-ring"
          aria-label={`${UI.name} home`}
        >
          <UIAsset asset={UI.logo} className="size-9" />
          <span className="text-2xl font-semibold tracking-tight">{UI.name}</span>
        </Link>
        <Link
          href={UI.routes.createAgent}
          onClick={closeMobile}
          aria-current={isCreateAgent ? "page" : undefined}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sidebar-primary px-3 text-sm font-medium text-sidebar-primary-foreground shadow-sm transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
        >
          <UIAsset asset={UI.icons.createAgent} className="size-4" />
          {UI.labels.createAgent}
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <nav aria-labelledby="agents-label">
          <div className="mb-3 flex items-center justify-between px-3">
            <h2 id="agents-label" className="text-xs font-medium text-muted-foreground">
              {UI.labels.agents}
            </h2>
            <span className="text-xs tabular-nums text-muted-foreground">{agents.length}</span>
          </div>
          <ul className="space-y-1">
            {agents.map((agent) => {
              const active = pathname === "/workspace" && !view && activeAgent === agent.id;
              return (
                <li key={agent.id}>
                  <Link
                    href={`/workspace?agent=${encodeURIComponent(agent.id)}`}
                    onClick={closeMobile}
                    aria-current={active ? "page" : undefined}
                    className={`${itemStyle} ${active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-border" : "text-muted-foreground"}`}
                  >
                    <Avatar className="size-8 rounded-lg after:rounded-lg">
                      <AvatarImage src={agent.image} alt="" className="rounded-lg" />
                      <AvatarFallback className={`rounded-lg ${agent.avatarClassName || ""}`}>
                        {agent.icon ? (
                          <UIAsset asset={{ icon: agent.icon }} className="size-5" />
                        ) : (
                          agent.name[0]
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 flex-1 truncate">{agent.name}</span>
                    {active && (
                      <span
                        className="size-1.5 rounded-full bg-sidebar-primary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {agents.length === 0 && (
            <p className="px-3 text-sm text-muted-foreground">Your agents will appear here.</p>
          )}
        </nav>
      </SidebarContent>
      <SidebarFooter className="shrink-0 gap-3 px-3 pb-4 pt-3">
        <Link
          href="/workspace?view=marketplace"
          onClick={closeMobile}
          aria-current={view === "marketplace" ? "page" : undefined}
          className={`${itemStyle} ${view === "marketplace" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground"}`}
        >
          <UIAsset asset={UI.icons.marketplace} className="size-5" />
          <span className="flex-1">{UI.labels.marketplace}</span>
          <UIAsset asset={UI.icons.externalLink} className="size-4 text-muted-foreground/60" />
        </Link>
        <div className="mx-2 border-t border-sidebar-border/80" />
        <AccountDrawer email={session?.user?.email}>
          <Avatar className="size-9">
            <AvatarImage src={session?.user?.image || UI.userAvatar} alt="" />
            <AvatarFallback className="bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{username}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{UI.labels.personalWorkspace}</p>
          </div>
        </AccountDrawer>
      </SidebarFooter>
    </Sidebar>
  );
}
