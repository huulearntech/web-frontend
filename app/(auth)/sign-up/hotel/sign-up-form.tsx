"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelType } from "@/lib/generated/prisma/enums";
import { FormField } from "@/components/ui/form";
import LocationSelect from "./location-select";

const formSchema = z.object({
  name:         z.string().trim().min(1, "Hotel name is required."),
  wardId:       z.string().trim().min(1, "Ward / location id is required."),
  longitude:    z.string().min(1, "Longitude cannot be empty").pipe(z.coerce.number()),
  latitude:     z.string().min(1, "Latitude cannot be empty").pipe(z.coerce.number()),
  type:         z.enum(Object.values(HotelType)),
  description:  z.string().optional(),
  checkInTime:  z.iso.time({ precision: -1, error: "Check-in time must be a valid time." }),
  checkOutTime: z.iso.time({ precision: -1, error: "Check-out time must be a valid time." }),
  breakfastAvailability: z.boolean(),
  imageUrls:    z.object({ url: z.url() }).array().transform((arr) => arr.map((item) => item.url)),
});

type FormSchemaInput  = z.input<typeof formSchema>;
type FormSchemaOutput = z.output<typeof formSchema>;

export default function HotelSignUpForm({
  defaultValues,
  onSubmit = (data) => {
    console.log("Submitted data:", data);
  },
}: {
  defaultValues?: FormSchemaInput;
  onSubmit?: (data: FormSchemaOutput) => Promise<void> | void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchemaInput, unknown, FormSchemaOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      wardId: "",
      longitude: "",
      latitude: "",
      type: "HOTEL",
      checkInTime: "14:00",
      checkOutTime: "12:00",
      breakfastAvailability: false,
      imageUrls: [],
    },
    mode: "onTouched",
  });

  async function handleSubmit(values: FormSchemaOutput) {
    startTransition(async () => {
      await onSubmit(values);
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6 max-w-lg"
      noValidate
    >
      {form.formState.errors.root && (
        <div className="text-red-600">
          {form.formState.errors.root.message}
        </div>
      )}

      <div>
        <Label>Hotel name</Label>
        <Input
          {...form.register("name", { required: "Hotel name is required." })}
          className="mt-1"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Ward / Location ID</Label>
        <FormField
          control={form.control}
          name="wardId"
          render={({ field: { value, onChange, ...props} }) => (
            <LocationSelect wardId={value} onWardIdChange={(wardId) => onChange(wardId)} {...props} />
          )}
        />
        {form.formState.errors.wardId && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.wardId.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Latitude</Label>
          <Input
            type="number"
            step="any"
            {...form.register("latitude", { required: "Latitude is required." })}
            className="mt-1"
          />
          {form.formState.errors.latitude && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.latitude.message}
            </p>
          )}
        </div>
        <div>
          <Label>Longitude</Label>
          <Input
            type="number"
            step="any"
            {...form.register("longitude", { required: "Longitude is required." })}
            className="mt-1"
          />
          {form.formState.errors.longitude && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.longitude.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>Hotel type</Label>
        <Controller
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => field.onChange(val as FormSchemaOutput["type"])}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOTEL">Hotel</SelectItem>
                <SelectItem value="MOTEL">Motel</SelectItem>
                <SelectItem value="RESORT">Resort</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="HOSTEL">Hostel</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label>Description (optional)</Label>
        <Textarea {...form.register("description")} className="mt-1" rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Check-in time</Label>
          <Input
            type="time"
            {...form.register("checkInTime", { required: "Check-in time is required." })}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          {form.formState.errors.checkInTime && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.checkInTime.message}
            </p>
          )}
        </div>
        <div>
          <Label>Check-out time</Label>
          <Input
            type="time"
            {...form.register("checkOutTime", { required: "Check-out time is required." })}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          {form.formState.errors.checkOutTime && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.checkOutTime?.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={form.control}
          name="breakfastAvailability"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <span className="text-sm">Breakfast available</span>
      </div>

      <div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Create hotel"}
          </Button>
        </div>
      </div>
    </form>
  );
}