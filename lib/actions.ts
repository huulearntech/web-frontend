"use server";

import { redirect } from "next/navigation";
import { paths } from "@/constants/paths";
import { SignUpData, SignInData } from "./zod_schemas/auth";

import { signIn } from "@/auth";
import { AuthError, CredentialsSignin } from "next-auth";

export async function onSubmitSignUpForm(values: SignUpData) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    const response = await fetch(`${appUrl}/api/v1/sign-up`, {
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

export async function onSubmitSignInForm(values: SignInData) {
  try {
    await signIn("credentials", { ...values, redirectTo: paths.home });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Authentication error:", error.message);
    } else if (error instanceof CredentialsSignin ) {
      console.error("CredentialsSignin: ", error.message)
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
