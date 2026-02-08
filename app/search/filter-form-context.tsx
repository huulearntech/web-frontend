import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const FILTER_CATEGORIES = {
  amenities: { label: "Tiện nghi", options: ["WiFi", "Parking", "Pool", "Gym"] },
  propertyTypes: { label: "Loại hình lưu trú", options: ["Apartment", "House", "Villa"] },
  ratings: { label: "Đánh giá", options: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"] },
} as const;

export type CategoryKey = keyof typeof FILTER_CATEGORIES;

export const typedEntries = <T extends Record<string, any>>(obj: T) =>
  Object.entries(obj) as [keyof T, T[keyof T]][];

const groupsShape = Object.fromEntries(
  (Object.keys(FILTER_CATEGORIES) as CategoryKey[]).map((key) => [key, z.array(z.string())])
) as { [K in CategoryKey]: z.ZodArray<z.ZodString> };

export const filterZodSchema = z.object({
  priceRange: z.tuple([z.number().min(0), z.number().min(0)]),
  ...groupsShape,
});

export type FilterFormType = z.infer<typeof filterZodSchema>;

export function FilterFormProvider({
  initialValues,
  children,
}: {
  initialValues: FilterFormType;
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof filterZodSchema>>({
    resolver: zodResolver(filterZodSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
}

export function useFilterForm() {
  const context = useFormContext<FilterFormType>();
  if (!context) {
    throw new Error("useFilterForm must be used within a FilterFormProvider");
  }
  return context;
}