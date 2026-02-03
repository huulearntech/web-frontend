import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { paths } from "@/constants/paths";
import SignInForm from "./sign-in-form";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect(paths.home);
  }

  return <SignInForm />;
}