// TODO: Update images instead of just URLs. Maybe use Cloudinary
// TODO: useSWR for image URLs so we can show previews and validate them before submission
// TODO: handle image URL editing/deletion in the form (currently you can only add new ones, not remove or edit existing ones)
// TODO: handle multiple room in one form (e.g. for bulk editing/creation) - this will require more significant changes to the form structure and API

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { mutate } from "swr";
import { type Room } from "@/lib/generated/prisma/client";


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

type RoomSerialized = Omit<Room, "price"> & { price: string };

const RoomFormSchema = z.object({
  type: z.string(),
  adultCapacity: z.coerce.number().int(),
  childrenCapacity: z.coerce.number().int(),
  price: z.coerce.number(),
  imageUrls: z.object({ url: z.url() }).array().transform(urlObjects => urlObjects.map(obj => obj.url)),
})
type RoomFormInput = z.input<typeof RoomFormSchema>;
type RoomFormOutput = z.output<typeof RoomFormSchema>;

export default function RoomForm({
  room, onSubmit
}: {
  room?: RoomSerialized;
  onSubmit: (data: any) => Promise<any>
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomFormInput, unknown, RoomFormOutput>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: { ...room, imageUrls: room?.imageUrls.map(url => ({ url })) ?? [] },
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "imageUrls",
  });

  async function onSubmitLocal(values: RoomFormOutput) {
    setBusy(true);
    setError(null);
    try {
      console.log(values);
      await onSubmit(values);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!room) return;
    if (!confirm("Delete this room? This cannot be undone.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Failed to delete room");
      }

      // Remove the deleted room from caches and revalidate the list
      await mutate(`/api/rooms/${room.id}`, null, false);
      await mutate("/api/rooms");

      router.push("/dashboard/rooms");
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room ? "Edit room" : "Add new room"}</CardTitle>
        <CardDescription>{room ? "Update the details of this room." : "Fill in the details of the new room."}</CardDescription>
      </CardHeader>
      <CardContent>

        <form onSubmit={handleSubmit(onSubmitLocal)} className="space-y-4">
          {/* <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.type && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div> */}

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

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving..." : "Save changes"}
            </Button>
            {room && (
              <Button variant="destructive" type="button" onClick={onDelete} disabled={busy}>
                Delete room
              </Button>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}