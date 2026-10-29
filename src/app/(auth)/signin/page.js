"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "../actions/auth";
import { useAccount } from "@/hooks/useAccount";

const SignInPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { setAccount } = useAccount();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      const userSignInData = {
        email: email,
        password: password,
      };
      const { account, user } = await signIn(userSignInData);

      if (account) {
        setAccount(account);
      }
      if (user) {
        setUser(user);
        toast.success("Signin successful");
        router.push("/events/new");
      }
    } catch (error) {
      toast.error(`Exception during signin. Exception: ${error.message}`);
    }
  };
  return (
    <Card className="mt-10 w-[500px] mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to Sign In
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="example@gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Password"
              />
            </div>
            <Button className="w-full cursor-pointer" type="submit">
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              Forgot Password?{" "}
              <Link href="/forgot-password" className="underline text-sm ">
                Forgot Password.
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
