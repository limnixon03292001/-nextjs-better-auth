import ReturnBtn from "@/components/return-btn";
import SignOutBtn from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  //2nd line of protection for unauthenticated users (1st line of protection (middleware))
  if (!session) redirect("/auth/login");

  //heer we are just showcasing how we can check if the user has permission to posts
  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      //disabling userid: ..., because we already passing headers above, but we can also use the code below
      // userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

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

      <div className="text-2xl font-bold">Permissions</div>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE OWN POSTS
        </Button>
      </div>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
