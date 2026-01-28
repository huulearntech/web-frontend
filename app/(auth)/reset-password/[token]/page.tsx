// If the token is invalid or expired, return a expired page and do not render the reset password form.
import { getSession } from "@/lib/session";
import { verifyResetToken } from "@/lib/auth";
import ExpiredPage from "@/components/ExpiredPage";
import ResetPasswordForm from "@/components/ResetPasswordForm";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = params;

  // Verify the reset token
  const isValidToken = await verifyResetToken(token);

  if (!isValidToken) {
    return <ExpiredPage message="The password reset link is invalid or has expired." />;
  }

  return <ResetPasswordForm token={token} />;
}