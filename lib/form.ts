import { z } from "zod";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<TSchema extends z.ZodTypeAny>(params: {
  schema: TSchema;
  defaultValues: z.infer<TSchema>;
}) {
  return useForm<
    z.infer<TSchema> extends FieldValues ? z.infer<TSchema> : FieldValues
  >({
    // TODO: don't know if the AI got it right with the any casts here
    resolver: zodResolver(params.schema as any),
    defaultValues: params.defaultValues as any,
  });
}