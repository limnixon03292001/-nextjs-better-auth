"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInEmailAction } from "@/app/actions";
import Link from "next/link";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Login successful!");
      router.push("/profile");
    }

    //**WE ARE CALLING AUTH-CLIENT FOR CLIENT SIDE AUTHENTICATION  */
    // const email = String(formData.get("email"));
    // if (!email) return toast.error("Please enter your email.");

    // const password = String(formData.get("password"));
    // if (!password) return toast.error("Please enter your password.");

    // await signIn.email(
    //   {
    //     email,
    //     password,
    //   },
    //   {
    //     onRequest: () => {
    //       setIsPending(true);
    //     },
    //     onResponse: () => {
    //       setIsPending(false);
    //     },
    //     onError: (ctx) => {
    //       toast.error(ctx.error.message);
    //     },
    //     onSuccess: () => {
    //       toast.success("Login successful!");
    //       router.push("/profile");
    //     },
    //   },
    // );
    //**END WE ARE CALLING AUTH-CLIENT FOR CLIENT SIDE AUTHENTICATION  */
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm italic text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </>
  );
}
