// TODO: Update images instead of just URLs. Use Cloudinary
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FormProvider, FieldArrayWithId } from "react-hook-form";

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

import { MultiRoomFormSchema, type MultiRoomFormInput, MultiRoomFormOutput } from "@/lib/zod_schemas/create-room";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MultiRoomFormType = ReturnType<typeof useForm<MultiRoomFormInput, unknown, MultiRoomFormOutput>>;

export default function RoomForm({ onSubmit }: { onSubmit: (data: MultiRoomFormOutput) => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<MultiRoomFormInput, unknown, MultiRoomFormOutput>({
    resolver: zodResolver(MultiRoomFormSchema),
    defaultValues: {
      rooms: [
        {
          name: "",
          type: "",
          price: 0,
          adultCapacity: 0,
          childrenCapacity: 0,
          areaM2: 0,
          bedType: "OTHER",
          imageUrls: [{ url: "" }],
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const { fields: roomFields, append: appendRoom, remove: removeRoom } = useFieldArray({
    control,
    name: "rooms",
  });

  async function onSubmitLocal(data: MultiRoomFormOutput) {
    startTransition(async () => {
      await onSubmit(data);
      // TODO: handle success or error (feedback, resetting form, etc.)
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitLocal)} className="space-y-4">
        {roomFields.map((field, idx) => (
          <RoomFields
            key={field.id}
            index={idx}
            control={control}
            register={register}
            errors={errors}
            roomFields={roomFields}
            removeRoom={removeRoom}
          />
        ))}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() =>
              appendRoom({
                name: "",
                type: "",
                price: 0,
                adultCapacity: 0,
                childrenCapacity: 0,
                areaM2: 0,
                bedType: "OTHER",
                imageUrls: [{ url: "" }],
              })
            }
          >
            Add room
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save all rooms"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

/* RoomFields moved out of RoomForm so it keeps a stable identity across renders
   which prevents inputs from being remounted and losing focus. */
function RoomFields({
  index,
  control,
  register,
  errors,
  roomFields,
  removeRoom,
}: {
  index: number;
  control: MultiRoomFormType["control"];
  register: MultiRoomFormType["register"];
  errors: MultiRoomFormType["formState"]["errors"];
  roomFields: FieldArrayWithId<MultiRoomFormInput, "rooms", "id">[];
  removeRoom: (i: number) => void;
}) {
  // Each room has its own imageUrls field array.
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: `rooms.${index}.imageUrls` as const,
  });

  const roomErrors = (errors.rooms && errors.rooms[index]) ?? {};

  return (
    <Card key={roomFields[index].id} className="mb-4">
      <CardHeader>
        <CardTitle>Room {index + 1}</CardTitle>
        <CardDescription>Fill in the details of this room.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.name`} className="text-sm font-medium">
            Name
          </Label>
          <Input id={`rooms.${index}.name`} className="w-full" {...register(`rooms.${index}.name` as const)} />
          {roomErrors?.name && <p className="text-xs text-destructive mt-1">{roomErrors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.type`} className="text-sm font-medium">
            Type
          </Label>
          <Input id={`rooms.${index}.type`} className="w-full" {...register(`rooms.${index}.type` as const)} />
          {roomErrors?.type && <p className="text-xs text-destructive mt-1">{roomErrors.type.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.price`} className="text-sm font-medium">
            Price per night (USD)
          </Label>
          <Input
            id={`rooms.${index}.price`}
            type="number"
            step="0.01"
            className="w-full"
            {...register(`rooms.${index}.price`, { valueAsNumber: true })}
          />
          {roomErrors?.price && <p className="text-xs text-destructive mt-1">{roomErrors.price.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.adultCapacity`} className="text-sm font-medium">
            Adult capacity
          </Label>
          <Input id={`rooms.${index}.adultCapacity`} type="number" className="w-full" {...register(`rooms.${index}.adultCapacity` as const)} />
          {roomErrors?.adultCapacity && <p className="text-xs text-destructive mt-1">{roomErrors.adultCapacity.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.childrenCapacity`} className="text-sm font-medium">
            Children capacity
          </Label>
          <Input id={`rooms.${index}.childrenCapacity`} type="number" className="w-full" {...register(`rooms.${index}.childrenCapacity` as const)} />
          {roomErrors?.childrenCapacity && <p className="text-xs text-destructive mt-1">{roomErrors.childrenCapacity.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`rooms.${index}.areaM2`} className="text-sm font-medium">
            Area (m2)
          </Label>
          <Input id={`rooms.${index}.areaM2`} type="number" className="w-full" {...register(`rooms.${index}.areaM2` as const)} />
          {roomErrors?.areaM2 && <p className="text-xs text-destructive mt-1">{roomErrors.areaM2.message}</p>}
        </div>

        {/** Addtional information for choice "OTHER"? */}
        <FormField
          control={control}
          name={`rooms.${index}.bedType` as const}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-medium">Bed Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select bed type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SINGLE">Single</SelectItem>
                  <SelectItem value="DOUBLE">Double</SelectItem>
                  <SelectItem value="QUEEN">Queen</SelectItem>
                  <SelectItem value="KING">King</SelectItem>
                  <SelectItem value="TWIN">Twin</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex flex-col gap-2">
          <Label className="text-sm font-medium">Image URLs</Label>

          <div className="flex flex-col space-y-2">
            {imageFields.map((field, imgIndex) => (
              <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Input
                  placeholder="https://placehold.co/400x300.png?text=Room+Image"
                  className="flex-1"
                  {...register(`rooms.${index}.imageUrls.${imgIndex}.url` as const)}
                />
                <Button type="button" variant="ghost" className="h-9" onClick={() => removeImage(imgIndex)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div>
            <Button type="button" onClick={() => appendImage({ url: "" })}>
              Add image URL
            </Button>
          </div>

          {roomErrors?.imageUrls && <p className="text-xs text-destructive mt-1">{roomErrors.imageUrls?.message ?? "Invalid image URLs"}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-4">
        <div className="text-sm text-destructive">{errors.rooms?.[index]?.message}</div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="destructive" onClick={() => removeRoom(index)}>
            Remove room
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}