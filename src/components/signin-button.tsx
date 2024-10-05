"use client";

import { GithubSignIn } from "@/actions/login";
import { Button } from "@/components/ui/button";

export const SignInButton = () => {
  return (
    <form action={async () => await GithubSignIn()}>
      <Button type="submit">Signin with GitHub</Button>
    </form>
  );
};
