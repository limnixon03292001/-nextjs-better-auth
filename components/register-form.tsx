"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const name = String(formData.get("name"));
    if (!name) return toast.error("Please enter your name.");

    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email.");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password.");

    await signUp.email(
      {
        name,
        email,
        password,
      },
      {
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
          toast.success("Registration complete!");
          router.push("/auth/login");
        },
      },
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Register
        </Button>
      </form>
    </>
  );
}
