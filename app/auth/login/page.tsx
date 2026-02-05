import LoginForm from "@/components/login-form";
import ReturnBtn from "@/components/return-btn";
import SignInOauthBtn from "@/components/sign-in-oauth";
import Link from "next/link";

export default function page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/" label="Home" />
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <div className="space-y-4">
        <LoginForm />

        <p className="text-muted-foreground text-sm">
          Dont&apos;t have an account?{" "}
          <Link href="/auth/register" className="hover:text-foreground">
            Register
          </Link>
        </p>
      </div>

      <hr className="max-w-sm" />

      <div className="flex flex-col max-w-sm gap-4">
        <SignInOauthBtn provider="google" />
        <SignInOauthBtn provider="github" />
      </div>
    </div>
  );
}
