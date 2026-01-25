import LoginForm from "@/components/login-form";
import ReturnBtn from "@/components/return-btn";
import Link from "next/link";

export default function page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/" label="Home" />
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <LoginForm />

      <p className="text-muted-foreground text-sm">
        Dont&apos;t have an account?{" "}
        <Link href="/auth/register" className="hover:text-foreground">
          Register
        </Link>
      </p>
    </div>
  );
}
