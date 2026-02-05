"use server";

import { redirect } from "next/navigation";
import { paths } from "@/lib/constants/paths";
import { SignUpData } from "./zod_schemas/auth";

export async function onSubmitSignUpForm(values: SignUpData) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    const response = await fetch(`${appUrl}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        action: "signUp",
      }),
    });
    if (!response.ok) {
      console.error("Sign up failed:", response.statusText);
      return;
    }
    console.log("signup is ok");
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
  redirect(paths.signIn);
};