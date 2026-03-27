"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { PATHS } from "@/lib/constants";
import { schemaSignUp, SignUpData, defaultSignUpValues } from "@/lib/zod_schemas/auth";
import { signUpUser } from "@/lib/actions/auth";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2Icon } from "lucide-react";
import PasswordInput from "@/components/password-input";


export default function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpData>({
    resolver: zodResolver(schemaSignUp),
    defaultValues: defaultSignUpValues,
  });

  const onSubmit = (data: SignUpData) => {
    startTransition(async () => {
      const { success, errors } = await signUpUser(data);
      if (success) {
        router.push(PATHS.signIn);
      } else {
        const { fieldErrors, formErrors } = errors;
        Object.entries(fieldErrors).forEach(([fieldName, errorMessages]) => {
          if (errorMessages && errorMessages.length > 0) {
            form.setError(fieldName as keyof SignUpData, { message: errorMessages[0] });
          }
        });
        if (formErrors && formErrors.length > 0) {
          form.setError("root", { message: formErrors[0] });
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} autoFocus className="md:text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} className="md:text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={isPending} className="md:text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 md:text-base" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              Signing up...
              <Loader2Icon className="animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Sign Up
              <ArrowRight />
            </div>
          )}
        </Button>
        <div className="flex flex-col gap-4 mt-4 text-sm">
          <Link href={PATHS.signIn} replace>
            Already have an account? Sign In
          </Link>
          <Link href={PATHS.forgotPassword}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  );
};