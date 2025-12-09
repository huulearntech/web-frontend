"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vi } from "react-day-picker/locale";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AutoComplete, AutoCompleteContent, AutoCompleteItem, AutoCompleteTrigger } from "./ui/auto-complete";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  inoutDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  numAdults: z.number().min(1).max(30),
  numChildren: z.number().min(0).max(6),
  numRooms: z.number().min(1).max(30),
});

function getDefaultInoutDates () {
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setDate(fromDate.getDate() + 1);
  return {
    from: fromDate,
    to: toDate,
  }
}

export default function SearchBar({
  className,
}: {
  className?: string,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      inoutDates: getDefaultInoutDates(),
      numAdults: 2,
      numChildren: 0,
      numRooms: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col lg:flex-row gap-2 items-start",
          className
        )}>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="relative w-full" >
              <FormLabel htmlFor="location-input">Location</FormLabel>
              <AutoComplete modal={false}>
                <FormControl>
                  <AutoCompleteTrigger {...field} id="location-input" placeholder="Nhap dia chi ban muon den" />
                </FormControl>
                <AutoCompleteContent className="w-60" align="center">
                  {/* <AutoCompleteEmpty>No result found</AutoCompleteEmpty> */}
                  {/* <AutoCompleteLoading>Loading...</AutoCompleteLoading> */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <AutoCompleteItem key={index}>Here is the result {index}</AutoCompleteItem>
                  ))}
                </AutoCompleteContent>
              </AutoComplete>
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
                  <Button variant="outline" id="date-range-picker">bla</Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0" >
                  <FormControl>
                    <Calendar
                      mode="range"
                      // numberOfMonths={2} // TODO: Handle when the screen width is too small
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

        <FormItem className="w-full">
          <FormLabel htmlFor="guests-and-rooms">Khach va phong</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="guests-and-rooms" variant="outline"> bla bla </Button>
            </PopoverTrigger>
            <PopoverContent className="w-xs overflow-hidden" >
              <FormField
                control={form.control}
                name="numAdults"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <FormLabel> Adults </FormLabel>
                    <div className="flex space-x-2">
                      <Button onClick={() => form.setValue("numAdults", form.getValues("numAdults") - 1)}>-</Button>
                      <FormControl>
                        <Input {...field} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={() => form.setValue("numAdults", form.getValues("numAdults") + 1)}>+</Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numChildren"
                render={({ field }) => (
                  <FormItem className="flex justify-between mt-2">
                    <FormLabel> Children </FormLabel>
                    <div className="flex space-x-2">
                      <Button onClick={() => form.setValue("numChildren", form.getValues("numChildren") - 1)}>-</Button>
                      <FormControl>
                        <Input {...field} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={() => form.setValue("numChildren", form.getValues("numChildren") + 1)}>+</Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numRooms"
                render={({ field }) => (
                  <FormItem className="flex justify-between mt-2">
                    <FormLabel> Rooms </FormLabel>
                    <div className="flex space-x-2">
                      <Button onClick={() => form.setValue("numRooms", form.getValues("numRooms") - 1)}>-</Button>
                      <FormControl>
                        <Input {...field} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button onClick={() => form.setValue("numRooms", form.getValues("numRooms") + 1)}>+</Button>
                    </div>
                  </FormItem>
                )}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <Button type="submit" className="w-full mt-[22px] lg:w-fit">
          <MagnifyingGlassIcon />
          Search
        </Button>
      </form>
    </Form>
  );
}