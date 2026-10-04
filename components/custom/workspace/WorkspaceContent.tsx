"use client";

import { UI, SAMPLE_AGENTS } from "@/lib/constants/ui";
import { UIAsset } from "@/components/custom/UIAsset";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useWorkspaceAgents } from "./WorkspaceAgentsProvider";

export default function WorkspaceContent({ agent, view }: { agent?: string; view?: string }) {
  const { agents, isReady } = useWorkspaceAgents();
  const selectedAgent = agents.find((item) => item.id === agent);
  if (agent && !view && !selectedAgent)
    return (
      <div className="flex flex-1 items-center justify-center px-5 py-8 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold">
            {isReady ? UI.agentForm.unavailable : UI.agentForm.loading}
          </h1>
          {isReady && (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {UI.agentForm.unavailableDescription}
            </p>
          )}
        </div>
      </div>
    );
  const title =
    view === "marketplace" ? UI.labels.marketplace : selectedAgent?.name || `Welcome to ${UI.name}`;
  const asset = view === "marketplace" ? UI.icons.marketplace : UI.logo;
  const description =
    view === "marketplace"
      ? "Discover new agents here soon."
      : selectedAgent
        ? SAMPLE_AGENTS.some((item) => item.id === selectedAgent.id)
          ? "This is a sample agent. Agent conversations are coming soon."
          : selectedAgent.description || UI.agentForm.ready
        : "A little help. A lot of possibility. Select an agent to get started.";
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center px-5 py-8 sm:px-8">
      <div className="w-full min-w-0 max-w-md text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-sidebar">
          {selectedAgent && !view ? (
            <Avatar className="size-14 rounded-2xl after:rounded-2xl">
              <AvatarImage
                src={selectedAgent.image}
                alt={`${selectedAgent.name} avatar`}
                className="rounded-2xl"
              />
              <AvatarFallback className={`rounded-2xl ${selectedAgent.avatarClassName || ""}`}>
                {selectedAgent.icon ? (
                  <UIAsset asset={{ icon: selectedAgent.icon }} className="size-7" />
                ) : (
                  selectedAgent.name[0]
                )}
              </AvatarFallback>
            </Avatar>
          ) : (
            <UIAsset asset={asset} className="size-7 text-muted-foreground" />
          )}
        </div>
        <h1 className="wrap-break-word text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
