"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { paths } from "@/constants/paths";
import { schemaSignUp, SignUpData, defaultSignUpValues } from "@/lib/zod_schemas/auth";
import { onSubmitSignUpForm } from "@/lib/actions";

export default function SignUp() {
  // TODO: Cleanup
  const form = useForm<SignUpData>({
    resolver: zodResolver(schemaSignUp),
    defaultValues: defaultSignUpValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitSignUpForm)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2">
          Sign Up <ArrowRight />
        </Button>
        <div className="flex flex-col gap-4 mt-4 text-sm">
          <Link href={paths.signIn} replace>
            Already have an account? Sign In
          </Link>
          <Link href={paths.forgotPassword}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  )
};