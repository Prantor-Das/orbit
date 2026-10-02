"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);

  return (
    <div>
      <h2>Hello World</h2>
      <Button onClick={() => console.log("Session:", session)}>Check Session</Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
