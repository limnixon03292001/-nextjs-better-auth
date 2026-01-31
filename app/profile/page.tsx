import ReturnBtn from "@/components/return-btn";
import SignOutBtn from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //2nd line of protection for unauthenticated users (1st line of protection (middleware))
  if (!session) redirect("/auth/login");

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/" label="Home" />
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
      <div className="flex items-center gap-2">
        {session.user.role === "Admin" && (
          <Button size="sm" asChild>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </Button>
        )}
        <SignOutBtn />
      </div>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
