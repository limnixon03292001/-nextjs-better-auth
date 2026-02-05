import ReturnBtn from "@/components/return-btn";
import { error } from "console";
import React from "react";

interface ErrorPageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const sp = await searchParams;

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>

      <p className="text-destructive">
        {sp.error === "account_not_linked"
          ? "This account is already linked to another sign-in method"
          : "Oops! Something went wrong. Please try again."}
      </p>
    </div>
  );
}
