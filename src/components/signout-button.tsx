"use client";

import { SignOut } from "@/actions/login";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form action={async () => await SignOut()}>
      <Button variant={"destructive"} type="submit">
        Sign Out
      </Button>
    </form>
  );
}
