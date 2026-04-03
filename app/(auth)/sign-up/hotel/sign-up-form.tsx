"use client";

import { useState } from "react";
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

export type HotelFormData = {
  name: string;
  wardId: string;
  longitude: number;
  latitude: number;
  type: "HOTEL" | "MOTEL" | "RESORT" | "APARTMENT" | "HOSTEL" | "OTHER";
  description?: string;
  checkInTime: string; // "HH:MM"
  checkOutTime: string; // "HH:MM"
  breakfastAvailability: boolean;
  imageUrls: string[];
};

type FormValues = {
  name: string;
  wardId: string;
  longitude: string;
  latitude: string;
  type: HotelFormData["type"];
  description?: string;
  checkInTime: string;
  checkOutTime: string;
  breakfastAvailability: boolean;
  imageUrlsRaw: string;
};

export default function HotelSignUpForm({
  defaultValues,
  onSubmit = (data) => {console.log("Submitted data:", data)},
}: {
  defaultValues?: Partial<HotelFormData>;
  onSubmit?: (data: HotelFormData) => Promise<void> | void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      name: defaultValues?.name ?? "",
      wardId: defaultValues?.wardId ?? "",
      longitude: defaultValues?.longitude?.toString() ?? "",
      latitude: defaultValues?.latitude?.toString() ?? "",
      type: (defaultValues?.type as FormValues["type"]) ?? "HOTEL",
      description: defaultValues?.description ?? "",
      checkInTime: defaultValues?.checkInTime ?? "14:00",
      checkOutTime: defaultValues?.checkOutTime ?? "12:00",
      breakfastAvailability: defaultValues?.breakfastAvailability ?? false,
      imageUrlsRaw: (defaultValues?.imageUrls ?? []).join(", "),
    },
    mode: "onTouched",
  });

  function parseImageUrls(raw: string) {
    return raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function handleSubmit(values: FormValues) {
    setError(null);

    // Additional validation not covered by react-hook-form rules
    if (!values.checkInTime.match(/^\d{2}:\d{2}$/)) {
      setError("Check-in time must be HH:MM.");
      return;
    }
    if (!values.checkOutTime.match(/^\d{2}:\d{2}$/)) {
      setError("Check-out time must be HH:MM.");
      return;
    }
    if (!values.longitude || Number.isNaN(Number(values.longitude))) {
      setError("Valid longitude is required.");
      return;
    }
    if (!values.latitude || Number.isNaN(Number(values.latitude))) {
      setError("Valid latitude is required.");
      return;
    }

    const payload: HotelFormData = {
      name: values.name.trim(),
      wardId: values.wardId.trim(),
      longitude: Number(values.longitude),
      latitude: Number(values.latitude),
      type: values.type,
      description: values.description?.trim() || undefined,
      checkInTime: values.checkInTime,
      checkOutTime: values.checkOutTime,
      breakfastAvailability: values.breakfastAvailability,
      imageUrls: parseImageUrls(values.imageUrlsRaw),
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
    } catch (err: any) {
      setError(err?.message ?? String(err) ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6 max-w-lg"
      noValidate
    >
      {error && <div className="text-red-600">{error}</div>}

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
        <Input
          {...form.register("wardId", { required: "Ward / location id is required." })}
          className="mt-1"
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
          onValueChange={(val) => field.onChange(val as FormValues["type"])}
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
            className="mt-1"
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
            className="mt-1"
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
              onCheckedChange={(v) => field.onChange(Boolean(v))}
            />
          )}
        />
        <span className="text-sm">Breakfast available</span>
      </div>

      <div>
        <Label>Image URLs (comma or newline separated)</Label>
        <Textarea {...form.register("imageUrlsRaw")} className="mt-1" rows={3} />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Create hotel"}
        </Button>
      </div>
    </form>
  );
}