'use client';
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(auth)/actions/auth";
import { useAccount } from "@/hooks/useAccount";
import { set } from "zod";
import { toast } from "sonner";

const SignOutButton = ({isSideBar}) => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { account, setAccount } = useAccount();

  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = () => {
    console.log(account);
    startTransition(async () => {
      try {
        const data = await signOut();
        if (!data) {
          setUser(null);
          setAccount(null);
          console.log(account);
          toast.success("Successfully signed out");
          router.push("/");
        }
      } catch (error) {
        toast.error(`Exception during signin. Exception: ${error.message}`);
      }
    });
  };

  return (
    <div
      onClick={handleClickSignOutButton}
      className={cn(
        "w-full text-left cursor-pointer hover:bg-gray-100flex items-center text-black bg- white",
        isSideBar && "p-4 text-left hover:bg-black hover:text-white flex items-center text-black text-base font-medium"
  )}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Sign Out"}
    </div>
  );
};
export default SignOutButton;
