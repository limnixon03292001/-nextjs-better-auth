import ReturnBtn from "@/components/return-btn";
import SignOutBtn from "@/components/sign-out-btn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/" label="Home" />
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <SignOutBtn />

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
