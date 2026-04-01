// if user click on "Near me", we ask for location permission.
  // useEffect(() => {
  //   // Ask for user's location permission and set default center to their location if granted
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setDefaultCenter([position.coords.latitude, position.coords.longitude]);
  //         setUserLocated(true);
  //       },
  //       (error) => {
  //         console.warn("Geolocation permission denied or unavailable, using default center.", error);
  //       }
  //     );
  //   }
  // }, []);

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { vi } from "react-day-picker/locale";
import { cn } from "@/lib/utils";

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

import { ArrowRight, ChevronDown, Minus, Plus, Search } from "lucide-react";

import { SearchBarFormSchema, type SearchBarFormData } from "@/lib/zod_schemas/search-bar";
import {
  MAX_ADULTS,
  MAX_CHILDREN,
  MAX_ROOMS,
  MIN_ADULTS,
  MIN_CHILDREN,
  MIN_ROOMS,
  PATHS
} from "@/lib/constants";

import useSWR from "swr";
import { SearchParamsCodec } from "@/app/search/(root)/tmp";
import { ComponentProps, useState } from "react";
import { user_getLocationOrHotelByQueryString } from "@/lib/actions/search-bar";

export default function SearchBar({
  defaultValues,
  className
}: {
  defaultValues?: SearchBarFormData;
  className?: string
}) {
  const [isOpenOnMobile, setIsOpenOnMobile] = useState(false);
  const form = useForm<SearchBarFormData>({
    resolver: zodResolver(SearchBarFormSchema),
    defaultValues: defaultValues ?? {
      location: "",
      inOutDates: {
        from: new Date(),
        to: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      guestsAndRooms: {
        numAdults: 2,
        numChildren: 0,
        numRooms: 1,
      }
    }
  });

  const { handleSubmit, control } = form;
  return (
    <Form {...form}>
      <div className={cn(
        "flex gap-x-1 md:gap-x-0 items-end content",
        className
      )}>
        <SearchBarForm
          data-open={isOpenOnMobile}
          handleSubmit={handleSubmit}
          control={control}
        />
        <Button
          type="button"
          variant="ghost"
          className="md:hidden mx-auto mb-1"
          onClick={() => setIsOpenOnMobile(prev => !prev)}
        >
          <ChevronDown className={cn("size-5 transition-transform duration-200", isOpenOnMobile && "rotate-180")} />
        </Button>
      </div>
    </Form>
  );
}


export function SearchBar__NonCollapsible({
  defaultValues,
  className
}: {
  defaultValues?: SearchBarFormData;
  className?: string
}) {
  const form = useForm<SearchBarFormData>({
    resolver: zodResolver(SearchBarFormSchema),
    defaultValues: defaultValues ?? {
      location: "",
      inOutDates: {
        from: new Date(),
        to: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      guestsAndRooms: {
        numAdults: 2,
        numChildren: 0,
        numRooms: 1,
      }
    }
  });

  const { handleSubmit, control } = form;
  return (
    <Form {...form}>
      <SearchBarForm
        className={cn(
          "h-fit md:h-fit md:px-5",
          className
        )}
        data-open={false}
        handleSubmit={handleSubmit}
        control={control}
      />
    </Form>
  );
}

export function SearchBarForm({
  className,
  isOpenOnMobile,
  handleSubmit,
  control,
  ...props
}: ComponentProps<"form"> & {
  className?: string
  isOpenOnMobile?: boolean
  handleSubmit: ReturnType<typeof useForm<SearchBarFormData>>["handleSubmit"]
  control: ReturnType<typeof useForm<SearchBarFormData>>["control"]
}) {
  const router = useRouter();

  // TODO Tooltip for error when location is empty / number of guests is less than number of rooms
  // TODO: checkin & checkout -> date only
  const onSubmit = (values: SearchBarFormData) => {
    const searchParams = new URLSearchParams(SearchParamsCodec.encode(values)).toString();
    router.push(`${PATHS.search}?${searchParams}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-open={isOpenOnMobile}
      className={cn(
        "flex flex-col overflow-hidden gap-y-2 w-full h-15.5 data-[open=true]:h-65 transition-all duration-300 md:flex-row md:gap-y-0 md:gap-x-2 data-[open=true]:md:h-fit md:h-fit px-1 md:px-0 md:overflow-visible",
        className
      )}
      {...props}
    >
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel htmlFor="location-input">Khách sạn hoặc điểm đến</FormLabel>
            <LocationAutocomplete
              value={field.value}
              onValueChange={field.onChange}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="inOutDates"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel htmlFor="date-range-picker">Ngày nhận / trả phòng</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date-range-picker" className="text-sm lg:text-base overflow-hidden items-start">
                  {new Intl.DateTimeFormat("vi-VN", { month: "numeric", day: "numeric", year: "numeric" }).format(field.value.from) ?? "Nhận phòng"}
                  <ArrowRight />
                  {new Intl.DateTimeFormat("vi-VN", { month: "numeric", day: "numeric", year: "numeric" }).format(field.value.to) ?? "Trả phòng"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto overflow-hidden p-0 z-1000">
                <FormControl>
                  <Calendar
                    mode="range"
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
        control={control}
        name="guestsAndRooms"
        render={({ field }) => {
          const setGuests = (patch: Partial<typeof field.value>) =>
            field.onChange({ ...field.value, ...patch });

          return (
            <FormItem className="w-full">
              <FormLabel htmlFor="guests-and-rooms">Khách và phòng </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="guests-and-rooms" variant="outline" className="text-sm lg:text-base overflow-hidden items-start">
                    {field.value.numAdults + " người lớn, "}
                    {field.value.numChildren + " trẻ em, "}
                    {field.value.numRooms + " phòng"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-xs overflow-hidden z-1000">
                  <FormItem className="flex justify-between">
                    <FormLabel>Người lớn</FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button
                        onClick={() => setGuests({ numAdults: field.value.numAdults - 1 })}
                        disabled={field.value.numAdults <= MIN_ADULTS}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <FormControl>
                        <Input value={field.value.numAdults} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button
                        onClick={() => setGuests({ numAdults: field.value.numAdults + 1 })}
                        disabled={field.value.numAdults >= MAX_ADULTS}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </FormItem>

                  <FormItem className="flex justify-between mt-2">
                    <FormLabel>Trẻ em</FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button
                        onClick={() => setGuests({ numChildren: field.value.numChildren - 1 })}
                        disabled={field.value.numChildren <= MIN_CHILDREN}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <FormControl>
                        <Input value={field.value.numChildren} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button
                        onClick={() => setGuests({ numChildren: field.value.numChildren + 1 })}
                        disabled={field.value.numChildren >= MAX_CHILDREN}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </FormItem>

                  <FormItem className="flex justify-between mt-2">
                    <FormLabel>Phòng</FormLabel>
                    <div className="flex space-x-2 items-center">
                      <Button
                        onClick={() => setGuests({ numRooms: field.value.numRooms - 1 })}
                        disabled={field.value.numRooms <= MIN_ROOMS}
                        className="flex size-6 items-center justify-center rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <FormControl>
                        <Input value={field.value.numRooms} readOnly className="w-10 text-center" />
                      </FormControl>
                      <Button
                        onClick={() => setGuests({ numRooms: field.value.numRooms + 1 })}
                        disabled={field.value.numRooms >= Math.min(field.value.numAdults, MAX_ROOMS)}
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
        <span className="md:max-lg:hidden">Tìm kiếm</span>
      </Button>
    </form>
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

function LocationAutocomplete({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const maxSuggestions = 5;
  const { data, isLoading, error } = useSWR(
    value && value.trim() !== "" ? ["locations", value] : null,
    async ([, q]) => user_getLocationOrHotelByQueryString(q),
    { dedupingInterval: 500 }
  );

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
        placeholder="Bạn muốn đi đâu?"
        showTrigger={false}
        showClear
        className="w-full"
      />
      <AutocompleteContent>
        {isLoading && (
          <div className="px-2 py-1 text-sm text-gray-500">Đang tải...</div>
        )}

        {error && (
          <div className="px-2 py-1 text-sm text-red-500">Tải địa điểm thất bại</div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <AutocompleteEmpty>Không tìm thấy địa điểm này.</AutocompleteEmpty>
        )}

        {!isLoading && !error && items.length > 0 && (
          <AutocompleteList>
            {items.map(item => (
              <AutocompleteItem key={item.id} value={item.name}>
                {item.name}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}