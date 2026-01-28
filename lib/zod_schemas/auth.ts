import { z } from "zod";

export const schemaSignIn = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const schemaSignUp = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z.string().min(1, { error: "Name is required!" }),
  password: z.string().min(6, { error: "Password must be at least 6 characters long" }),
});

export const schemaForgotPassword = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export const schemaResetPassword = z.object({
  token: z.string().min(1, { message: "Token is required" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters long" }),
});

export const defaultSignInValues: SignInData = {
  email: "",
  password: "",
};

export const defaultSignUpValues: SignUpData = {
  email: "",
  name: "",
  password: "",
};

export const defaultForgotPasswordValues: ForgotPasswordData = {
  email: "",
};

export const defaultResetPasswordValues: ResetPasswordData = {
  token: "",
  newPassword: "",
};


export type SignInData = z.infer<typeof schemaSignIn>;
export type SignUpData = z.infer<typeof schemaSignUp>;
export type ForgotPasswordData = z.infer<typeof schemaForgotPassword>;
export type ResetPasswordData = z.infer<typeof schemaResetPassword>;