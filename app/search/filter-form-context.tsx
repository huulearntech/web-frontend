// TODO: Clean up.
"use client";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FILTER_MAX_PRICE, FILTER_MIN_PRICE } from "@/lib/constants";

export const FILTER_CATEGORIES = {
  amenities: { label: "Tiện nghi", options: ["WiFi", "Parking", "Pool", "Gym"] },
  propertyTypes: { label: "Loại hình lưu trú", options: ["Apartment", "House", "Villa"] },
  ratings: { label: "Đánh giá", options: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"] },
} as const;

export const filterZodSchema = z.object({
  priceRange: z.tuple([z.number().min(0), z.number().min(0)]),
  sortBy: z.enum(["priceAsc", "priceDesc", "ratingAsc", "ratingDesc"]),
  amenities: z.array(z.enum(FILTER_CATEGORIES.amenities.options)),
  propertyTypes: z.array(z.enum(FILTER_CATEGORIES.propertyTypes.options)),
  ratings: z.array(z.enum(FILTER_CATEGORIES.ratings.options)),
});

export type FilterFormType = z.infer<typeof filterZodSchema>;

export const defaultFilterValues: FilterFormType = {
  priceRange: [FILTER_MIN_PRICE, FILTER_MAX_PRICE],
  sortBy: "priceAsc",
  amenities: [],
  propertyTypes: [],
  ratings: [],
};

export function FilterFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<z.infer<typeof filterZodSchema>>({
    resolver: zodResolver(filterZodSchema),
    defaultValues: {
      priceRange: [FILTER_MIN_PRICE, FILTER_MAX_PRICE],
      sortBy: "priceAsc",
      ratings: [],
      amenities: [],
      propertyTypes: [],
    },
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