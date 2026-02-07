"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPassword, sendVerificationEmail } from "@/lib/auth-client";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!password) toast.error("Please enter your password.");

    if (password !== confirmPassword) {
      return toast.error("Password do not match.");
    }

    await resetPassword({
      newPassword: password,
      token: token,
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
        onSuccess: () => {
          toast.success("Password reset successfully!");
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        Reset Password
      </Button>
    </form>
  );
}
