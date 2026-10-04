"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { UIAsset } from "@/components/custom/UIAsset";
import { UI } from "@/lib/constants/ui";

export default function WorkspaceSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon-sm" className={className} onClick={toggleSidebar}>
      <UIAsset asset={UI.icons.sidebarToggle} className="size-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}
