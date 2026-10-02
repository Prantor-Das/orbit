"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SAMPLE_AGENTS, type SidebarAgent } from "@/lib/constants/ui";

const WorkspaceAgentsContext = createContext<{
  agents: SidebarAgent[];
  addAgent: (agent: SidebarAgent) => void;
} | null>(null);

export function WorkspaceAgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState(SAMPLE_AGENTS);
  return (
    <WorkspaceAgentsContext.Provider
      value={{ agents, addAgent: (agent) => setAgents((current) => [...current, agent]) }}
    >
      {children}
    </WorkspaceAgentsContext.Provider>
  );
}

export function useWorkspaceAgents() {
  const context = useContext(WorkspaceAgentsContext);
  if (!context) throw new Error("Workspace agents require WorkspaceAgentsProvider.");
  return context;
}
