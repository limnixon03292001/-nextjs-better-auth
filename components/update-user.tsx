"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { toast } from "sonner";
import { updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface UpdateUserFormProps {
  name: string;
  image: string;
}

export default function UpdateUserForm({ name, image }: UpdateUserFormProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const name = String(formData.get("name"));
    const image = String(formData.get("image"));

    if (!name && !image) {
      return toast.error("Please enter a name or image");
    }

    await updateUser({
      ...(name && { name }),
      image,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("User updated successfully!");
          (evt.target as HTMLFormElement).reset();
          router.refresh();
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={name} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Image">Image</Label>
        <Input type="url" id="image" name="image" defaultValue={image} />
      </div>

      <Button type="submit" disabled={isPending}>
        Update User
      </Button>
    </form>
  );
}
