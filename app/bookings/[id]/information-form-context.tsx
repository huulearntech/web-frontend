"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const InformationFormSchema = z.object({
  contactFullName: z.string().min(1, "Vui lòng nhập họ và tên"),
  // TODO: edit the phone regex to fit the vietnamese phone number format
  phone: z.string().regex(/^[0-9()+-\s]{6,20}$/, "Số điện thoại không hợp lệ"),
  email: z.email("Email không hợp lệ"),
  bookingForSomeoneElse: z.boolean(),
  customerFullName: z.string().optional(),
  specialRequests: z.array(z.boolean()).length(8),
}).refine(
  (val) => {
    if (!val.bookingForSomeoneElse) return true;
    return !!val.customerFullName && val.customerFullName.trim() !== "";
  },
  {
    path: ["customerFullName"],
    error: "Vui lòng nhập họ tên khách hàng",
  }
);

export type InformationFormType = z.infer<typeof InformationFormSchema>;

const defaultValues: InformationFormType = {
  contactFullName: "",
  phone: "",
  email: "",
  bookingForSomeoneElse: false,
  customerFullName: "",
  specialRequests: Array.from({ length: 8 }).map(() => false),
};

export function InformationFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<InformationFormType>({
    resolver: zodResolver(InformationFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
}

export function useInformationForm() {
  const context = useFormContext<InformationFormType>();
  if (!context) {
    throw new Error("useInformationForm must be used within a InformationFormProvider");
  }
  return context;
}