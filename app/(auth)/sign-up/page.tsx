import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { paths } from "@/constants/paths";
import SignUpForm from "./sign-up-form";

export default async function SignUpPage() {
  const session = await auth();
  if (session) {
    redirect(paths.home);
  }

  return <SignUpForm />;
}