import { PATHS } from "@/lib/constants";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./reset-password-form";
import prisma from "@/lib/prisma";
import crypto from "crypto";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string; }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;
  if (!token) redirect(PATHS.forgotPassword);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const resetTokenRecord = await prisma.verificationToken.findFirst({
    where: {
      code: hashedToken,
      type: "PASSWORD_RESET",
      used: false,
      expiresAt: { gte: new Date() }
    },
    select: { id: true }
  });

  if (!resetTokenRecord) redirect(PATHS.forgotPassword);

  return (
    <ResetPasswordForm token={token} />
  );
}