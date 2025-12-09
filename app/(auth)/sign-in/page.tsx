"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { paths } from "@/constants/paths";

const formSchema = z.object({
  email: z.email({ error: "Email is required"}),
  password: z.string().min(1, { error: "Password is required!"}),
});

export default function SignIn () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  function onSubmit (values: z.infer<typeof formSchema>) {
    console.log('Received values:', values);
    // Handle sign-in logic here, e.g., API call
  };

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