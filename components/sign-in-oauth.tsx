"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOauthBtnProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export default function SignInOauthBtn({
  provider,
  signUp,
}: SignInOauthBtnProps) {
  const [isPending, setIsPending] = useState(false);

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "Github";

  async function handleClick() {
    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <>
      <Button onClick={handleClick} disabled={isPending}>
        Sign {action} with {providerName}
      </Button>
    </>
  );
}
