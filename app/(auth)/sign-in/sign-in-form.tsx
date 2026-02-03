"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { paths } from "@/constants/paths";
import { schemaSignIn, SignInData, defaultSignInValues } from "@/lib/zod_schemas/auth";
import { signIn } from "next-auth/react";


export default function SignInForm () {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || paths.home;

  const form = useForm<SignInData>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: defaultSignInValues
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(async (value) => {
        await signIn("credentials", {
          ...value,
          callbackUrl,
        });
      })}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field}/>
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
                <Input {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2"
        >
          Sign In
          <ArrowRight />
        </Button>
        <div className="flex flex-col gap-4 mt-4 text-sm">
          <Link href={paths.signUp} replace>
            Don't have an account? Sign Up
          </Link>
          <Link href={paths.forgotPassword}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  )
};