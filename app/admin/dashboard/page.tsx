import DeleteUserBtn, {
  PlaceholderDeleteUserButton,
} from "@/components/delete-user-btn";
import LoginForm from "@/components/login-form";
import ReturnBtn from "@/components/return-btn";
import UserRoleSelect from "@/components/user-role-select";
import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
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
  // const users = await prisma.user.findMany({
  //   orderBy: { name: "asc" },
  // });

  //here we are directly using the better auth api to get the user list instead of prisma
  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: "name",
    },
  });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === "Admin" && b.role !== "Admin") return -1;
    if (a.role !== "Admin" && b.role === "Admin") return 1;

    return 0;
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
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
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
