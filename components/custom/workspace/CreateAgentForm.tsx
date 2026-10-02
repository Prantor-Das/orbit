"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UI, SAMPLE_AGENTS } from "@/lib/constants/ui";
import { UIAsset } from "@/components/custom/UIAsset";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspaceAgents } from "./WorkspaceAgentsProvider";

export default function CreateAgentForm() {
  const router = useRouter();
  const { addAgent } = useWorkspaceAgents();
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const avatar = SAMPLE_AGENTS[avatarIndex];
  const copy = UI.agentForm;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      nameInput.current?.focus();
      return;
    }
    const id = crypto.randomUUID();
    addAgent({ ...avatar, id, name: name.trim(), description: description.trim() });
    router.push(`/workspace?agent=${encodeURIComponent(id)}`);
  }

  return (
    <section
      aria-labelledby="create-agent-title"
      className="agent-create-page flex flex-1 flex-col px-5 py-6 sm:px-8 lg:px-12"
    >
      <div className="mx-auto my-auto w-full min-w-0 max-w-3xl">
        <header className="agent-create-heading mb-5">
          <h1 id="create-agent-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {UI.labels.createAgent}
          </h1>
          <p className="mt-2 text-sm leading-6 sm:text-base text-muted-foreground">
            {copy.description}
          </p>
        </header>
        <form onSubmit={submit} className="min-w-0">
          <div className="agent-create-avatar mb-5 flex flex-col items-center gap-3">
            <span className="sr-only">{copy.avatar}</span>
            <div className="agent-create-avatar-halo rounded-full bg-muted/50 p-4">
              <Avatar className="agent-create-image size-24 rounded-3xl after:rounded-3xl sm:size-32">
                <AvatarImage
                  src={avatar.image}
                  alt={`${avatar.name} avatar`}
                  className="rounded-3xl"
                />
                <AvatarFallback className={`rounded-3xl ${avatar.avatarClassName}`}>
                  {avatar.icon && <UIAsset asset={{ icon: avatar.icon }} className="size-12" />}
                </AvatarFallback>
              </Avatar>
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() =>
                setAvatarIndex(
                  (current) =>
                    (current + 1 + Math.floor(Math.random() * (SAMPLE_AGENTS.length - 1))) %
                    SAMPLE_AGENTS.length,
                )
              }
            >
              <UIAsset asset={UI.icons.shuffleImage} className="size-4" />
              {copy.shuffle}
            </Button>
          </div>
          <div className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="agent-name">{copy.name}</Label>
              <Input
                ref={nameInput}
                id="agent-name"
                name="name"
                required
                maxLength={100}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError(false);
                }}
                placeholder={copy.namePlaceholder}
                aria-invalid={nameError || undefined}
                aria-describedby={nameError ? "agent-name-error" : undefined}
                className="h-11"
              />
              {nameError && (
                <p id="agent-name-error" role="alert" className="text-sm text-destructive">
                  {copy.nameError}
                </p>
              )}
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="agent-description">
                {copy.descriptionLabel}
                <span className="font-normal text-muted-foreground">({copy.optional})</span>
              </Label>
              <Textarea
                id="agent-description"
                name="description"
                maxLength={copy.descriptionLimit}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={copy.descriptionPlaceholder}
                aria-describedby="agent-description-count"
                className="agent-create-description h-28 min-h-0 resize-none field-sizing-fixed sm:h-32"
              />
              <p
                id="agent-description-count"
                className="text-right text-xs tabular-nums text-muted-foreground"
              >
                {description.length} / {copy.descriptionLimit}
              </p>
            </div>
          </div>
          <div className="agent-create-actions mt-5 flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 min-w-24"
              onClick={() => router.push("/workspace")}
            >
              {copy.cancel}
            </Button>
            <Button type="submit" size="lg" className="h-11 min-w-36">
              <UIAsset asset={UI.icons.createAgent} className="size-4" />
              {copy.submit}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
