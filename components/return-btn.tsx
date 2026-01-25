import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnBtnProps {
  href: string;
  label: string;
}

export default function ReturnBtn({ href, label }: ReturnBtnProps) {
  return (
    <>
      <Button size="sm" asChild>
        <Link href={href}>
          <ArrowLeftIcon /> {label}
        </Link>
      </Button>
    </>
  );
}
