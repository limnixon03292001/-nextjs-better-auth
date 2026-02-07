import ResetPasswordForm from "@/components/reset-password";
import ReturnBtn from "@/components/return-btn";
import { redirect } from "next/navigation";

interface ResetPasswordProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Reset Password</h1>
      </div>

      <p className="text-muted-foreground">Please enter your new password.</p>

      <ResetPasswordForm token={token} />
    </div>
  );
}
