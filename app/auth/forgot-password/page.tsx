import ForgotPasswordForm from "@/components/forgot-password";
import ReturnBtn from "@/components/return-btn";

export default function VerifySuccessPage() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Success!</h1>
      </div>

      <p className="text-muted-foreground">
        Please enter your email address to receive a password reset link.
      </p>

      <ForgotPasswordForm />
    </div>
  );
}
