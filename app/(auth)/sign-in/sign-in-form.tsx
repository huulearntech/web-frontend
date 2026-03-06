"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PATHS } from "@/lib/constants";
import { schemaSignIn, SignInData, defaultSignInValues } from "@/lib/zod_schemas/auth";
import { signInUserWithOptionalCallback } from "@/lib/actions/auth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2Icon } from "lucide-react";


export default function SignInForm () {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || PATHS.home;

  const form = useForm<SignInData>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: defaultSignInValues
  })

  const onSubmit = (data: SignInData) => {
    startTransition(async () => {
      const result = await signInUserWithOptionalCallback(data, callbackUrl);
      if (result?.error) {
        form.setError("root", { message: result.error });
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
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
                <Input {...field} type="password" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-red-500">
          {form.formState.errors.root?.message}
        </p>

        <Button type="submit" className="mt-2">
          {isPending ?
            <div className="flex items-center gap-2">
              Signing in...
              <Loader2Icon className="animate-spin" />
            </div>
            :
            <div className="flex items-center gap-2">
              Sign In
              <ArrowRight />
            </div>
          }
        </Button>
        <div className="flex flex-col gap-4 mt-4 text-sm">
          <Link href={PATHS.signUp} replace>
            Don't have an account? Sign Up
          </Link>
          <Link href={PATHS.forgotPassword}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  )
};