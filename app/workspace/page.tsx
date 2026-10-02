import WorkspaceContent from "@/components/custom/workspace/WorkspaceContent";

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ agent?: string; view?: string }>;
}) {
  const params = await searchParams;
  return <WorkspaceContent agent={params.agent} view={params.view} />;
}
