import ReturnBtn from "@/components/return-btn";

export default function VerifySuccessPage() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Success!</h1>
      </div>

      <p className="text-muted-foreground">
        Success! You have successfully registered. Please check your email for
        verification link.
      </p>
    </div>
  );
}
