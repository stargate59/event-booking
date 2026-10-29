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
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signUp } from "../actions/auth";
import { useAccount } from "@/hooks/useAccount";

const SignupPage = () => {
  const { setUser } = useAuth();
  const { setAccount } = useAccount();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const firstName = e.target["first-name"].value;
      const lastName = e.target["last-name"].value;
      console.log(`email ${JSON.stringify(firstName)}`);

      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      const userSignUpData = {
        email: email,
        password: password,
        displayName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        role: "tenant",
      };
      const { account, user } = await signUp(userSignUpData);

      if (account) {
        setAccount(account);
      }
      if (user) {
        setUser(user);
        toast.success("Sign up successful");
        redirect("/events/new");
      }
    } catch (error) {
      toast.error(`Exception signing up. Exception: ${error.message}`);
    }
  };
  return (
    <Card className="mt-10 w-[500px] mx-auto">
      <CardHeader>
        <CardTitle>Sign Up for an Account</CardTitle>
        <CardDescription>
          Enter your name, email and password to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  placeholder="John"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="*******"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                placeholder="*******"
              />
            </div>
            <Button className="w-full cursor-pointer" type="submit">
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="underline">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
