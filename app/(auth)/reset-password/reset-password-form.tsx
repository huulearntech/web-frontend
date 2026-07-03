"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PATHS } from "@/lib/constants";
import { ResetPasswordOutput, schemaResetPassword } from "@/lib/zod_schemas/auth";
import { handlePasswordReset } from "@/lib/actions/auth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import z from "zod";

const schemaResetPasswordWithConfirm = schemaResetPassword.extend({
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).transform((data) => ({ newPassword: data.newPassword }));

type ResetPasswordFormInput = z.input<typeof schemaResetPasswordWithConfirm>;
type ResetPasswordFormOutput = z.output<typeof schemaResetPasswordWithConfirm>;



export default function ResetPasswordForm({ token }: { token: string }) {
  const submitWithToken = handlePasswordReset.bind(null, token);

  const [isPending, startTransition] = useTransition();

   const form = useForm<ResetPasswordFormInput, unknown, ResetPasswordFormOutput>({
     resolver: zodResolver(schemaResetPasswordWithConfirm),
     defaultValues: {
        newPassword: "",
        confirmPassword: "",
     }
   })

  const onSubmit = (data: ResetPasswordOutput) => {
    startTransition(async () => {
      const result = await submitWithToken(data);
      if (result.success) {
        toast.success("Mật khẩu của bạn đã được đặt lại thành công. Vui lòng đăng nhập lại.");
        redirect(PATHS.signIn);
      } else {
        form.setError("root", { message: "Đã xảy ra lỗi. Vui lòng thử lại." });
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-7">
        <CardHeader className="p-0 text-center">
          <CardTitle> Đặt lại mật khẩu </CardTitle>
          <CardDescription> Vui lòng nhập mật khẩu mới của bạn. </CardDescription>
        </CardHeader>

        <fieldset disabled={isPending} className="flex flex-col gap-y-7">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root &&
            <p className="text-sm text-destructive"> {form.formState.errors.root.message} </p>
          }

          <Button type="submit">
            {form.formState.isSubmitting ?
              <>
                <Loader2Icon className="animate-spin" />
                Đang đặt lại mật khẩu...
              </>
              :
              <> Đặt lại mật khẩu </>
            }
          </Button>
        </fieldset>
      </form>
    </Form>
  )
};