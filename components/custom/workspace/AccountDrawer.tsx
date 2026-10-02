"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { UI } from "@/lib/constants/ui";
import { UIAsset } from "@/components/custom/UIAsset";
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function AccountDrawer({
  children,
  email,
}: {
  children: ReactNode;
  email?: string | null;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => setMounted(true), []);

  async function logout() {
    setLoggingOut(true);
    setError(false);
    try {
      await signOut({ callbackUrl: "/sign-in" });
    } catch {
      setError(true);
      setLoggingOut(false);
    }
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const itemClassName = "min-h-11 cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={UI.labels.accountSettings}
        className="flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2 text-left text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring data-popup-open:bg-sidebar-accent"
      >
        {children}
        <UIAsset
          asset={UI.icons.accountSettings}
          className="ml-auto size-4 shrink-0 text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={10}
        className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-popover p-2 shadow-xl ring-0"
        aria-label={UI.labels.accountSettings}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className="truncate px-3 py-3 text-sm font-normal"
            title={email || UI.labels.accountSettings}
          >
            {email || UI.labels.accountSettings}
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={itemClassName}
            disabled={!mounted}
            onClick={() => setTheme(nextTheme)}
          >
            <UIAsset
              asset={nextTheme === "light" ? UI.icons.lightMode : UI.icons.darkMode}
              className="size-5"
            />
            {nextTheme === "light" ? UI.labels.lightMode : UI.labels.darkMode}
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            className={itemClassName}
            disabled={!mounted}
            checked={mounted && theme === "system"}
            onCheckedChange={(checked) => setTheme(checked ? "system" : resolvedTheme || "light")}
          >
            <UIAsset asset={UI.icons.systemMode} className="size-5" />
            {UI.labels.systemMode}
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-3 my-2" />
        <DropdownMenuItem
          className={itemClassName}
          disabled={loggingOut}
          closeOnClick={false}
          onClick={logout}
        >
          <UIAsset asset={UI.icons.logout} className="size-5" />
          {loggingOut ? UI.labels.loggingOut : UI.labels.logout}
        </DropdownMenuItem>
        {error && (
          <p role="alert" className="px-3 py-2 text-sm text-destructive">
            {UI.labels.logoutError}
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
