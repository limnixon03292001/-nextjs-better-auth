import ReturnBtn from "@/components/return-btn";
import SendVerificationEmailForm from "@/components/send-verification-email-form";
import { redirect } from "next/navigation";

interface VerifyPageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const sp = await searchParams;

  if (!sp.error) redirect("/profile");

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Verify Email</h1>
      </div>

      <p className="text-destructive">
        {sp.error === "invalid_token" || sp.error === "token_expired"
          ? "Your token is invalid or expired please request a new one."
          : "Oops! Something went wrong. Please try again."}
      </p>

      <SendVerificationEmailForm />
    </div>
  );
}
