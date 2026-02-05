"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vi } from "react-day-picker/locale"; // Add more locales
import { cn } from "@/lib/utils";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, Minus, Plus, Search } from "lucide-react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from "@/components/autocomplete";
import { useMediaQuery } from "usehooks-ts";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";

// TODO: Move formSchema to a separate file if it's used in multiple places
const formSchema = z.object({
  location: z.string() /*.min(1, { message: "Location is required" })*/,
  inoutDates: z.object({
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
        <Button className={cn("w-full justify-start rounded-full text-base", className)} variant={"outline"} aria-label="Open search dialog">
          <Search />
          <span className="ml-2 text-gray-600"> {/** form location */} Tìm kiếm </span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 backdrop-blur-xs bg-white/20" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium"> Search </DialogTitle>
          </DialogHeader>
          <SearchBarImpl className="p-4 w-screen max-w-md" />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

// TODO: Clean up
function SearchBarImpl({ className }: { className?: string }) {
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco", "Seattle", "Boston", "Denver", "Atlanta"];
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      inoutDates: {
        from: undefined,
        to: undefined,
      },
      guestsAndRooms: {
        numAdults: 2,
        numChildren: 0,
        numRooms: 1,
      }
    },
  });

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    form.setValue("inoutDates", { from: today, to: tomorrow});
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col md:flex-row gap-2 items-start",
          className
        )}>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="relative w-full" >
              <FormLabel htmlFor="location-input">Location</FormLabel>
              <Autocomplete
                modal={false}
                items={locations.slice(0,5)}
                value={field.value}
                onValueChange={field.onChange}
              >
                <AutocompleteInput
                  id="location-input"
                  placeholder="Where are you going?"
                  showTrigger={false}
                  showClear
                  // FIXME: font size not working properly
                  className={"text-base!"}
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
          )}
        />
        <FormField
          control={form.control}
          name="inoutDates"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="date-range-picker"> Check-in / Check-out </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date-range-picker" className="text-base">
                    { // TODO: Clean up and support localization
                      field.value.from
                        ? field.value.from.toLocaleDateString("vi-VN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : "Check-in"
                    }
                    <ArrowRight />
                    {field.value.to
                      ? field.value.to.toLocaleDateString("vi-VN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "Check-out"
                    }
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0" >
                  <FormControl>
                    <Calendar
                      mode="range"
                      numberOfMonths={2} // TODO: useMediaQuery to make it responsive
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
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="guests-and-rooms">Guests and rooms</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="guests-and-rooms" variant="outline" className="text-base">
                    {field.value.numAdults} adults, {field.value.numChildren} children, {field.value.numRooms} rooms
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-xs overflow-hidden" >
                  <FormItem className="flex justify-between">
                    <FormLabel> Adults </FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button
                        onClick={() => form.setValue("guestsAndRooms", {
                          ...form.getValues("guestsAndRooms"),
                          numAdults: form.getValues("guestsAndRooms").numAdults - 1,
                        })}
                        disabled={field.value.numAdults <= 1}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4"/>
                      </Button>
                      <FormControl>
                        <Input value={field.value.numAdults} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={
                        // TODO: Handle min/max properly
                        () => form.setValue("guestsAndRooms", {
                          ...form.getValues("guestsAndRooms"),
                          numAdults: form.getValues("guestsAndRooms").numAdults + 1,
                        })}
                        disabled={field.value.numAdults >= 30}
                        className="flex size-6 items-center justify-center rounded-full"
                        >
                        <Plus className="size-4"/>
                      </Button>
                    </div>
                  </FormItem>

                  <FormItem className="flex justify-between mt-2">
                    <FormLabel> Children </FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button onClick={() => form.setValue("guestsAndRooms", {
                        ...form.getValues("guestsAndRooms"),
                        numChildren: form.getValues("guestsAndRooms").numChildren - 1,
                      })}
                        disabled={field.value.numChildren <= 0}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <FormControl>
                        <Input value={field.value.numChildren} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={() => form.setValue("guestsAndRooms", {
                        ...form.getValues("guestsAndRooms"),
                        numChildren: form.getValues("guestsAndRooms").numChildren + 1,
                      })}
                        disabled={field.value.numChildren >= 6}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </FormItem>

                  <FormItem className="flex justify-between mt-2">
                    <FormLabel> Rooms </FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button onClick={() => form.setValue("guestsAndRooms", {
                        ...form.getValues("guestsAndRooms"),
                        numRooms: form.getValues("guestsAndRooms").numRooms - 1,
                      })}
                        disabled={field.value.numRooms <= 1}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <FormControl>
                        <Input value={field.value.numRooms} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={() => form.setValue("guestsAndRooms", {
                        ...form.getValues("guestsAndRooms"),
                        numRooms: form.getValues("guestsAndRooms").numRooms + 1,
                      })}
                        disabled={field.value.numRooms >= field.value.numAdults}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Plus className="size-4"/>
                      </Button>
                    </div>
                  </FormItem>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-5.5 md:w-fit">
          <Search />
          <span className="md:max-lg:hidden"> Search </span>
        </Button>
      </form>
    </Form>
  );
}