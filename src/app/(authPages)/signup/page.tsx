"use client";
import LogoIcon from "@/components/common/LogoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<AuthStateType>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.body.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-background">
      <div className="h-screen w-full min-h-max flex justify-center items-center">
        <div className="w-full mx-2 my-4 bg-muted p-6 rounded-lg max-w-sm">
          <div className="flex justify-center">
            <LogoIcon size={50} />
          </div>
          <h1 className="text-2xl font-bold">Register</h1>
          <p>Become a micro blogger</p>

          <form onSubmit={handleSubmit}>
            {/* Name Input Field  */}
            <div className="mt-5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your Email"
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
              <ErrorSpan>{errors?.name}</ErrorSpan>
            </div>

            {/* Username Input Field  */}
            <div className="mt-5">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter Unique Username"
                onChange={(e) =>
                  setAuthState({ ...authState, username: e.target.value })
                }
              />
              <ErrorSpan>{errors?.username}</ErrorSpan>
            </div>

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
              <ErrorSpan>{errors?.email}</ErrorSpan>
            </div>

            {/* Password Input Field  */}
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Create Strong password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
              <ErrorSpan>{errors?.password}</ErrorSpan>
            </div>

            {/* Confirm Password Input Field  */}
            <div className="mt-5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>

            {/* Login Button  */}
            <div className="mt-5">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-5">
            <span>Already Registered?</span>{" "}
            <Link
              href={"/login"}
              className="font-semibold text-orange-400 hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const ErrorSpan = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-red-500 text-sm">{children}</span>;
};
