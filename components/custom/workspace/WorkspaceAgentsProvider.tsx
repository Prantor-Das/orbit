"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { SAMPLE_AGENTS, type SidebarAgent } from "@/lib/constants/ui";
import { parseWorkspaceAgents } from "@/lib/workspace-agents";

const WorkspaceAgentsContext = createContext<{
  agents: SidebarAgent[];
  addAgent: (agent: SidebarAgent) => void;
  isReady: boolean;
} | null>(null);

export function WorkspaceAgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState(SAMPLE_AGENTS);
  const { data: session, status } = useSession();
  const storageKey = session?.user?.email
    ? `orbit:workspace-agents:v1:${session.user.email}`
    : null;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    setAgents(SAMPLE_AGENTS);
    setLoadedKey(null);
    if (status === "loading" || !storageKey) return;

    function restore() {
      let raw: string | null = null;
      try {
        raw = localStorage.getItem(storageKey!);
      } catch {
        /* Creation reports unavailable storage. */
      }
      const saved = parseWorkspaceAgents(
        raw,
        SAMPLE_AGENTS.map((agent) => agent.id),
      );
      setAgents([
        ...SAMPLE_AGENTS,
        ...saved.map((agent) => ({
          ...SAMPLE_AGENTS.find((avatar) => avatar.id === agent.avatarId)!,
          id: agent.id,
          name: agent.name,
          description: agent.description,
        })),
      ]);
      setLoadedKey(storageKey);
    }
    restore();
    const sync = (event: StorageEvent) => {
      if (event.storageArea === localStorage && (event.key === storageKey || event.key === null))
        restore();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [storageKey, status]);

  const isReady = status !== "loading" && !!storageKey && loadedKey === storageKey;
  function addAgent(agent: SidebarAgent) {
    if (!isReady || !storageKey) throw new Error("Workspace storage is not ready.");
    const avatar = SAMPLE_AGENTS.find((item) => item.image === agent.image);
    if (!avatar) throw new Error("Unknown agent avatar.");
    // Read before writing so another tab's saved agents aren't overwritten.
    const current = parseWorkspaceAgents(
      localStorage.getItem(storageKey),
      SAMPLE_AGENTS.map((item) => item.id),
    );
    const next = [
      ...current.filter((item) => item.id !== agent.id),
      {
        id: agent.id,
        name: agent.name,
        description: agent.description || "",
        avatarId: avatar.id,
      },
    ];
    localStorage.setItem(storageKey, JSON.stringify(next));
    setAgents([
      ...SAMPLE_AGENTS,
      ...next.map((item) => ({
        ...SAMPLE_AGENTS.find((template) => template.id === item.avatarId)!,
        id: item.id,
        name: item.name,
        description: item.description,
      })),
    ]);
  }
  return (
    <WorkspaceAgentsContext.Provider
      value={{ agents: isReady ? agents : SAMPLE_AGENTS, addAgent, isReady }}
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
