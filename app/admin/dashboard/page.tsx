import DeleteUserBtn, {
  PlaceholderDeleteUserButton,
} from "@/components/delete-user-btn";
import LoginForm from "@/components/login-form";
import ReturnBtn from "@/components/return-btn";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "Admin") {
    return (
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-8">
          <ReturnBtn href="/profile" label="profile" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            FORBIDDEN. YOU DON'T HAVE ACCESS TO THIS PAGE!
          </p>
        </div>
      </div>
    );
  }

  //query to the db using PRISMA, find all users
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnBtn href="/profile" label="profile" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2 text-center">Role</th>
              <th className="px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">{user.role}</td>
                <td className="px-4 py-2 text-center">
                  {user.role === "User" ? (
                    <DeleteUserBtn userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
