"use client";
import LogoIcon from "@/components/common/LogoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

export default function LogIn() {
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("authState", authState);
  };

  return (
    <div className="bg-background">
      <div className="h-screen w-full min-h-max flex justify-center items-center">
        <div className="w-full mx-2 bg-muted p-6 rounded-lg max-w-sm">
          <div className="flex justify-center">
            <LogoIcon size={50} />
          </div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Welcome Back</p>

          <form onSubmit={handleSubmit}>
            {/* Email Input Field  */}
            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
            </div>

            {/* Password Input Field  */}
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your Password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
            </div>

            {/* Login Button  */}
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-5">
            <span>Don&#39;t Have an account?</span>{" "}
            <Link
              href={"/signup"}
              className="font-semibold text-orange-400 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
