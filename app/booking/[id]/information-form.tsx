"use client";
// TODO: Change to newer Shadcn Forms when available

import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

import { useInformationForm } from "./information-form-context";

export default function InformationForm () {
  const { control, register, watch, formState: { errors } } = useInformationForm();

  const bookingForSomeoneElse = watch("bookingForSomeoneElse");

  return (
    <form className="w-full h-fit flex flex-col rounded-4xl bg-white shadow-lg p-4 gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <MailIcon className="size-5" />
          <h2 className="text-xl font-semibold"> Liên hệ đặt chỗ </h2>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Thêm liên hệ để nhận xác nhận đặt chỗ.
        </div>
      </div>
      

      <div className="flex flex-col gap-y-4 rounded-4xl bg-blue-50 p-4">
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="contact-full-name" className="text-xs font-semibold ml-1">Họ và tên</Label>
          <Input
            type="text"
            id="contact-full-name"
            {...register("contactFullName")}
            className={buttonVariants({ variant: "outline", size: "default", className: "h-10" })}
            placeholder="Nhập họ và tên"
          />
          {errors.contactFullName && <div className="text-xs text-red-600 ml-1">{errors.contactFullName.message}</div>}
          <div className="text-xs font-semibold text-gray-500 ml-1">như trên CMND (không dấu)</div>
        </div>
        <div className="w-full flex gap-x-6">
          <div className="w-full flex flex-col gap-y-1">
            <Label htmlFor="phone-number" className="text-xs font-semibold ml-1">Số điện thoại</Label>
            <div className="flex gap-x-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 group">
                    bla bla
                    <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start">
                  <Command>
                    <CommandInput>
                    </CommandInput>
                    <CommandList className="max-h-60 overflow-y-auto text-sm">
                      <CommandEmpty>No results found</CommandEmpty>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CommandItem key={index}>
                          {index}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                type="tel"
                id="phone-number"
                {...register("phone")}
                className={buttonVariants({ variant: "outline", size: "default", className: "flex-1 h-10" })}
                placeholder="Nhập số điện thoại"
              />
            </div>
            {errors.phone && <div className="text-xs text-red-600 ml-1">{errors.phone.message}</div>}
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: 0123456789</div>
          </div>
         <div className="w-full flex flex-col gap-y-1">
            <Label htmlFor="email" className="text-xs font-semibold ml-1">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className={buttonVariants({ variant: "outline", size: "default", className: "flex-1 h-10" })}
              placeholder="Nhập địa chỉ email"
            />
            {errors.email && <div className="text-xs text-red-600 ml-1">{errors.email.message}</div>}
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: example@example.com</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <Controller
          control={control}
          name="bookingForSomeoneElse"
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(Boolean(v))}
              className="text-sm font-medium"
              aria-expanded={bookingForSomeoneElse}
            />
          )}
        />
        <Label htmlFor="consent" className="text-sm font-medium">
          I'm booking for someone else
        </Label>
      </div>

      <div
        aria-hidden={!bookingForSomeoneElse}
        className={cn(
          "flex flex-col gap-y-2 overflow-hidden transition-all duration-300 ease-in-out",
          bookingForSomeoneElse ? "max-h-50" : "max-h-0"
        )}
      >
          <div className="flex gap-x-2 items-center">
            <UserIcon className="size-5" />
            <h2 className="text-xl font-semibold"> Thông tin khách hàng</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            Vui lòng điền đầy đủ các thông tin để nhận xác nhận đơn hàng
          </div>

        <div className="flex flex-col rounded-4xl bg-blue-50 p-4">
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="customer-full-name" className="text-xs font-semibold ml-1">Họ và tên khách hàng</Label>
            <Input
              type="text"
              id="customer-full-name"
              {...register("customerFullName")}
              className={buttonVariants({ variant: "outline", size: "default", className: "h-10" })}
              placeholder="Nhập họ và tên"
            />
            {errors.customerFullName && <div className="text-xs text-red-600 ml-1">{errors.customerFullName.message}</div>}
            <div className="text-xs font-semibold text-gray-500 ml-1">như trên CMND (không dấu)</div>
          </div>
        </div>
      </div>

      {/** TODO: This is a grouped field */}
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <CheckCircle2Icon className="size-5" />
          <h2 className="text-xl font-semibold"> Yêu cầu đặc biệt</h2>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Tất cả các yêu cầu đặc biệt tùy thuộc vào tình trạng sẵn có và không được đảm bảo. Nhận phòng sớm hoặc đưa đón sân bay có thể phát sinh thêm phí. Vui lòng liên hệ trực tiếp với nhân viên khách sạn để biết thêm thông tin.
        </div>
      </div>

      <div className="grid grid-cols-3 rounded-4xl bg-blue-50 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="flex items-center gap-x-2 p-3" key={index}>
            <Controller
              control={control}
              name={`specialRequests.${index}` as const}
              render={({ field }) => (
                <Checkbox
                  id={`special-request-${index}`}
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(Boolean(v))}
                  className="text-sm font-medium"
                />
              )}
            />
            <Label htmlFor={`special-request-${index}`} className="text-sm font-medium">
              Yêu cầu đặc biệt {index + 1}
            </Label>
          </div>
        ))}
      </div>
    </form>
  )
}