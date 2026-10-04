import { redirect } from "next/navigation";
import { UI } from "@/lib/constants/ui";
import WorkspaceContent from "@/components/custom/workspace/WorkspaceContent";

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ agent?: string; view?: string }>;
}) {
  const params = await searchParams;
  if (params.view === "new") redirect(UI.routes.createAgent);
  return <WorkspaceContent agent={params.agent} view={params.view} />;
}
