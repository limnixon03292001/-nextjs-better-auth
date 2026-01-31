"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteUserAction } from "@/app/actions";
import { toast } from "sonner";

export default function DeleteUserBtn({ userId }: { userId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    const { error } = await deleteUserAction({ userId });

    if (error) {
      toast.error(error);
    } else {
      toast.success("User deleted successfully!");
    }

    setIsPending(false);
  }

  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        className="size-7 rounded-sm"
        disabled={isPending}
        onClick={handleClick}
      >
        <span className="sr-only">Delete User</span>
        <TrashIcon />
      </Button>
    </>
  );
}

export const PlaceholderDeleteUserButton = () => {
  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        className="size-7 rounded-sm"
        disabled
      >
        <span className="sr-only">Delete User</span>
        <TrashIcon />
      </Button>
    </>
  );
};
