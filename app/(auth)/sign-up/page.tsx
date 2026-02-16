import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PATHS } from "@/lib/constants";
import SignUpForm from "./sign-up-form";

export default async function SignUpPage() {
  const session = await auth();
  if (session) {
    redirect(PATHS.home);
  }

  return <SignUpForm />;
}