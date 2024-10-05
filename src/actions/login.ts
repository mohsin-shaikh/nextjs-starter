"use server";

import { signIn, signOut } from "@/auth";

export const GithubSignIn = async () => {
  await signIn("github");
};

export const SignOut = async () => {
  await signOut();
};
