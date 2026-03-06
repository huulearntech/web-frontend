// TODO: Update images instead of just URLs. Maybe use Cloudinary
// TODO: useSWR for image URLs so we can show previews and validate them before submission
// TODO: handle image editing/deletion in the form (currently you can only add new ones, not remove or edit existing ones)
// TODO: handle multiple room in one form (e.g. for bulk editing/creation) - this will require more significant changes to the form structure and API

"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const RoomFormSchema = z.object({
  type:             z.string(),
  adultCapacity:    z.coerce.number().int(),
  childrenCapacity: z.coerce.number().int(),
  price:            z.coerce.number(),
  imageUrls:        z.object({ url: z.url() }).array().transform(urlObjects => urlObjects.map(obj => obj.url)),
  // Transformation on client-side to reduce payload (for a bit).
})
type RoomFormInput = z.input<typeof RoomFormSchema>;
type RoomFormOutput = z.output<typeof RoomFormSchema>;
type RoomFormValues = z.infer<typeof RoomFormSchema>;

export default function RoomForm({ onSubmit }: { onSubmit: (data: any) => Promise<any> }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomFormInput, unknown, RoomFormOutput>({
    resolver: zodResolver(RoomFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "imageUrls",
  });

  async function onSubmitLocal(values: RoomFormValues) {
    startTransition(async () => {
      const res = await onSubmit(values); // await network
      // if (res instanceof Error) {
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new room</CardTitle>
        <CardDescription>Fill in the details of the new room.</CardDescription>
      </CardHeader>
      <CardContent>

        <form onSubmit={handleSubmit(onSubmitLocal)} className="space-y-4">
          <div>
            <Label htmlFor="name">Type</Label>
            <Input id="type" {...register("type")} />
            {errors.type && <p className="text-xs text-destructive mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Price per night (USD)</Label>
            <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="adultCapacity">Adult capacity</Label>
            <Input id="adultCapacity" type="number" {...register("adultCapacity")} />
            {errors.adultCapacity && <p className="text-xs text-destructive mt-1">{errors.adultCapacity.message}</p>}
          </div>

          <div>
            <Label htmlFor="childrenCapacity">Children capacity</Label>
            <Input id="childrenCapacity" type="number" {...register("childrenCapacity")} />
            {errors.childrenCapacity && <p className="text-xs text-destructive mt-1">{errors.childrenCapacity.message}</p>}
          </div>

          <div>
            <Label htmlFor="imageUrls">Image URLs</Label>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="https://placehold.co/400x300.png?text=Room+Image"
                  {...register(`imageUrls.${index}.url` as const)}
                />
                <Button type="button" variant="ghost" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}

            <Button type="button" onClick={() => append({ url: "" })}>
              Add image URL
            </Button>

            {errors.imageUrls && <p className="text-xs text-destructive mt-1">{(errors.imageUrls as any).message ?? "Invalid image URLs"}</p>}
          </div>

          {/* {error && <div className="text-sm text-destructive">{error}</div>} */}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}