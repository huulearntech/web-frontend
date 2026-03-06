// NOTE: This component is a bit complex
"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { vi } from "react-day-picker/locale";
import { cn, simulateFetchLocations } from "@/lib/utils";

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

import { formSchema, type SearchBarFormData, formatDate } from "@/lib/zod_schemas/search-bar";
import { PATHS } from "@/lib/constants";


export default function SearchBar({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const desktopQuery = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktopQuery);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <SearchBarSkeleton className={className} />; 
  if (isDesktop) return <SearchBarImpl isDesktop className={className} />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Open search dialog"
          variant="outline"
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
          <SearchBarImpl isDesktop={isDesktop} className="p-4 w-screen max-w-md" />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export function SearchBarImpl({ isDesktop, className }: { isDesktop: boolean; className?: string }) {
  const form = useForm<SearchBarFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      inOutDates: {
        from: new Date(),
        to: new Date(),
      },
      guestsAndRooms: {
        numAdults: 2,
        numChildren: 0,
        numRooms: 1,
      },
    },
  });
  const router = useRouter();

  // TODO: checkin & checkout -> date only
  const onSubmit = (values: SearchBarFormData) => {
    const searchParams = SearchPage__SearchParamsCodec.encode(values);
    router.push(`${PATHS.search}?${searchParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col md:flex-row gap-2 items-start", className)}
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="location-input">Location</FormLabel>
              <LocationAutocomplete
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inOutDates"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="date-range-picker">Check-in / Check-out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date-range-picker" className="text-sm lg:text-base overflow-hidden items-start">
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

            // TODO: This component is getting pretty big, consider extracting it to a separate component
            return (
              <FormItem className="w-full">
                <FormLabel htmlFor="guests-and-rooms">Guests and rooms</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="guests-and-rooms" variant="outline" className="text-sm lg:text-base overflow-hidden items-start">
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

        <Button type="submit" className="w-full mt-5.5 md:w-fit flex items-center text-sm lg:text-base">
          <Search />
          <span className="md:max-lg:hidden">Search</span>
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

import useSWR from "swr";
import { SearchPage__SearchParamsCodec } from "@/app/search/(root)/tmp";
function useLocationSearch(query: string) {
  return useSWR(
    query && query.trim() !== "" ? ["locations", query] : null,
    async ([, q]) => simulateFetchLocations(q),
    { dedupingInterval: 500 }
  );
}

function LocationAutocomplete({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const maxSuggestions = 5;
  const { data, isLoading, error } = useLocationSearch(value);
  const suggestedLocations = Array.isArray(data) ? data : [];
  const items = suggestedLocations.slice(0, maxSuggestions);

  return (
    <Autocomplete
      modal={false}
      items={items}
      value={value}
      onValueChange={onValueChange}
    >
      <AutocompleteInput
        id="location-input"
        placeholder="Where are you going?"
        showTrigger={false}
        showClear
        className="w-full"
      />
      <AutocompleteContent>
        {isLoading && (
          <div className="px-2 py-1 text-sm text-gray-500">Loading...</div>
        )}

        {error && (
          <div className="px-2 py-1 text-sm text-red-500">Failed to load locations.</div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <AutocompleteEmpty>No locations found.</AutocompleteEmpty>
        )}

        {!isLoading && !error && items.length > 0 && (
          <AutocompleteList>
            {items.map((item, idx) => (
              <AutocompleteItem key={`${item}-${idx}`} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}