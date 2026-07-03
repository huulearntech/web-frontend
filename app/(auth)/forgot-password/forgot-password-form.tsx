"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PATHS } from "@/lib/constants";
import { ForgotPasswordData, schemaForgotPassword, defaultForgotPasswordValues } from "@/lib/zod_schemas/auth";
import { requestPasswordReset } from "@/lib/actions/auth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

   const form = useForm<ForgotPasswordData>({
     resolver: zodResolver(schemaForgotPassword),
     defaultValues: defaultForgotPasswordValues // Must be defined, otherwise it will complain.
   })

  const onSubmit = (data: ForgotPasswordData) => {
    startTransition(async () => {
      const result = await requestPasswordReset(data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        form.setError("root", { type: "manual", message: result.message || "Đã có lỗi xảy ra. Vui lòng thử lại." });
      }
    })
  }

  return (
    <>
      {!isSubmitted ?
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-7">
            <CardHeader className="p-0 text-center">
              <CardTitle> Đặt lại mật khẩu </CardTitle>
              <CardDescription> Vui lòng nhập email của bạn để tiếp tục. </CardDescription>
            </CardHeader>

            <fieldset disabled={isPending} className="flex flex-col gap-y-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    Đang yêu cầu...
                  </>
                  :
                  <> Yêu cầu đặt lại mật khẩu </>
                }
              </Button>
            </fieldset>
          </form>
        </Form>
        :
        <div className="w-full flex flex-col gap-7">
          <CardHeader className="p-0 text-center">
            <CardTitle> Yêu cầu đặt lại mật khẩu thành công </CardTitle>
            <CardDescription>
              Nếu email của bạn đã đăng ký với hệ thống, hệ thống sẽ gửi cho bạn một email trong ít phút.
              Vui lòng kiểm tra hòm thư của bạn hoặc mục thư rác.
            </CardDescription>
          </CardHeader>
        </div>
      }
    </>
  )
};