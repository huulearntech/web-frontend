import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PATHS } from "@/lib/constants";
import SignInForm from "./sign-in-form";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect(PATHS.home);
  }

  return <SignInForm />;
}