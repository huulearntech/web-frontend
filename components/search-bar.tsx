"use client";

import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { vi } from "react-day-picker/locale"; // Add more locales, maybe just vi and en for simplicity
import { cn, debounce, simulateFetchLocations } from "@/lib/utils";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from "@/components/autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { ArrowRight, Minus, Plus, Search } from "lucide-react";

// TODO: Move formSchema to a separate file if it's used in multiple places
const formSchema = z.object({
  location: z.string() /*.min(1, { message: "Location is required" })*/,
  inOutDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guestsAndRooms: z.object({
    numAdults: z.number().min(1).max(30),
    numChildren: z.number().min(0).max(6),
    numRooms: z.number().min(1).max(30),
  }),
});

export default function SearchBar({
  className,
}: {
  className?: string,
}) {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => setMounted(true), []); // Prevent hydration mismatch
  if (!mounted) {
    return <div className={cn("h-12", className)} />
  }

  if (isDesktop) return (<SearchBarImpl className={className} />);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Open search dialog"
          variant={"outline"}
          className={cn("w-full justify-start rounded-full text-base", className)}
        >
          <Search className="size-5 ml-1"/>
          <span className="ml-1 text-gray-600"> Tìm kiếm </span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 backdrop-blur-xs bg-white/20" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium"> Search </DialogTitle>
            <DialogDescription className="mb-2 text-sm text-gray-600">
              Enter your search criteria below.
            </DialogDescription>
          </DialogHeader>
          <SearchBarImpl className="p-4 w-screen max-w-md" />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export function SearchBarImpl({ className }: { className?: string }) {
  const [locations, setLocations] = useState<string[]>([
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
    "Denver",
    "Atlanta",
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      inOutDates: {
        // FIXME: workaround to prevent render mismatch
        from: undefined as unknown as Date,
        to: undefined as unknown as Date,
      },
      // TODO: Should ungroup this?
      guestsAndRooms: {
        numAdults: 2,
        numChildren: 0,
        numRooms: 1,
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Replace with real navigation / search handler
    console.log("Search submitted:", values);
  };

  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    setMounted(true);

    // FIXME: properly handle default dates to prevent hydration mismatch
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    form.setValue("inOutDates", { from: today, to: tomorrow });
  }, []); // prevent hydration mismatch

  if (!mounted) return <SearchBarSkeleton className={className} />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col md:flex-row gap-2 items-start", className)}
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            const debouncedFetchRef = useRef(
              debounce(async (q: string) => {
                const results = await simulateFetchLocations(q);
                setLocations(results);
              }, 500)
            );

            useEffect(() => {
              return () => {
                debouncedFetchRef.current?.cancel();
              };
            }, []);
            return (
            <FormItem className="relative w-full">
              <FormLabel htmlFor="location-input">Location</FormLabel>
              <Autocomplete
                // TODO: add debouncing then fetch from API -> which means move this autocomplete to a separate component
                // to use "use client" and let it have its own items state
                modal={false}
                items={locations.slice(0, 5)}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (!value || value.trim() === "") {
                    setLocations([]);
                    debouncedFetchRef.current.cancel();
                    return;
                  }
                  debouncedFetchRef.current(value);
                }}
              >
                <AutocompleteInput
                  id="location-input"
                  placeholder="Where are you going?"
                  showTrigger={false}
                  showClear
                />
                <AutocompleteContent>
                  <AutocompleteEmpty>No locations found.</AutocompleteEmpty>
                  <AutocompleteList>
                    {(item) => (
                      <AutocompleteItem key={item} value={item}>
                        {item}
                      </AutocompleteItem>
                    )}
                  </AutocompleteList>
                </AutocompleteContent>
              </Autocomplete>
            </FormItem>
          )}}
        />

        <FormField
          control={form.control}
          name="inOutDates"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="date-range-picker">Check-in / Check-out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date-range-picker" className="text-base">
                    {formatDate(field.value.from) ?? "Check-in"}
                    <ArrowRight />
                    {formatDate(field.value.to) ?? "Check-out"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0">
                  <FormControl>
                    <Calendar
                      mode="range"
                      numberOfMonths={isDesktop ? 2 : 1}
                      locale={vi}
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guestsAndRooms"
          render={({ field }) => {
            const setGuests = (patch: Partial<typeof field.value>) =>
              field.onChange({ ...field.value, ...patch });

            return (
              <FormItem className="w-full">
                <FormLabel htmlFor="guests-and-rooms">Guests and rooms</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="guests-and-rooms" variant="outline" className="text-base">
                      {field.value.numAdults} adults, {field.value.numChildren} children, {field.value.numRooms} rooms
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-xs overflow-hidden">
                    <FormItem className="flex justify-between">
                      <FormLabel>Adults</FormLabel>
                      <div className="flex space-x-2 items-center">
                        <Button
                          onClick={() => setGuests({ numAdults: field.value.numAdults - 1 })}
                          disabled={field.value.numAdults <= 1}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Minus className="size-4" />
                        </Button>
                        <FormControl>
                          <Input value={field.value.numAdults} readOnly className="w-10 text-center" />
                        </FormControl>
                        <Button
                          onClick={() => setGuests({ numAdults: field.value.numAdults + 1 })}
                          disabled={field.value.numAdults >= 30}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </FormItem>

                    <FormItem className="flex justify-between mt-2">
                      <FormLabel>Children</FormLabel>
                      <div className="flex space-x-2 items-center">
                        <Button
                          onClick={() => setGuests({ numChildren: field.value.numChildren - 1 })}
                          disabled={field.value.numChildren <= 0}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Minus className="size-4" />
                        </Button>
                        <FormControl>
                          <Input value={field.value.numChildren} readOnly className="w-10 text-center" />
                        </FormControl>
                        <Button
                          onClick={() => setGuests({ numChildren: field.value.numChildren + 1 })}
                          disabled={field.value.numChildren >= 6}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </FormItem>

                    <FormItem className="flex justify-between mt-2">
                      <FormLabel>Rooms</FormLabel>
                      <div className="flex space-x-2 items-center">
                        <Button
                          onClick={() => setGuests({ numRooms: field.value.numRooms - 1 })}
                          disabled={field.value.numRooms <= 1}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Minus className="size-4" />
                        </Button>
                        <FormControl>
                          <Input value={field.value.numRooms} readOnly className="w-10 text-center" />
                        </FormControl>
                        <Button
                          onClick={() => setGuests({ numRooms: field.value.numRooms + 1 })}
                          disabled={field.value.numRooms >= field.value.numAdults}
                          className="flex size-6 items-center justify-center rounded-full"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </FormItem>
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full mt-5.5 md:w-fit flex items-center">
          <Search />
          <span className="md:max-lg:hidden text-base">Search</span>
        </Button>
      </form>
    </Form>
  );
}

export function SearchBarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("h-10 flex flex-col md:flex-row gap-2 items-start", className)}>
      <Skeleton className="h-full w-full md:w-3/10 rounded-full" />
      <Skeleton className="h-full w-full md:w-3/10 rounded-full" />
      <Skeleton className="h-full w-full md:w-3/10 rounded-full" />
      <Skeleton className="h-full w-full md:w-1/10 rounded-full" />
    </div>
  );
}


// TODO: use nextjs built-in internationalization support then clean up
export function formatDate(
  value: Date | string | undefined | null,
  locale: string = "en-US",
  opts?: Intl.DateTimeFormatOptions
) {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, opts ?? {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}