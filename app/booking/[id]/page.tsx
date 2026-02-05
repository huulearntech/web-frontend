import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CheckCircle2Icon,
  ChevronDownIcon,
  CigaretteOff,
  DoorOpen,
  ForkKnife,
  MailIcon,
  ScrollText,
  TagIcon,
  UserIcon,
  Wifi
} from "lucide-react";
import Link from "next/link";

import imageGirlJump from "@/public/images/booking-page-remind-user-to-signin.webp";
import Image from "next/image";


export default async function BookingPage({ params }: { params: { id: string } }) {
  const session = await auth();

  return (
    <>
      <div className="flex flex-col gap-y-4 min-w-100">
        {!session && (
          <div className="relative text-sm flex p-4 gap-x-4 pl-27.5 items-center justify-between rounded-xl bg-linear-to-b from-white to-[rgb(247,252,222)] shadow-lg">
            <Image src={imageGirlJump} width={85} height={74} alt="" className="absolute left-4 -top-7 w-[85px] object-contain" />
            Đăng nhập hoặc đăng ký để có giá rẻ hơn và nhiều ưu đãi hơn!
            {/** TODO: callbackUrl, which has to be on the client side */}
            <Link href={"/sign-in"} className="font-semibold text-primary"> Đăng nhập / Đăng ký </Link>
          </div>
        )}
        <InformationForm />

        <div className="w-full h-fit flex flex-col rounded-4xl bg-white shadow-lg p-4 gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <ScrollText className="size-5" />
              <h2 className="text-xl font-semibold"> Chính sách chỗ ở </h2>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Vui lòng đọc kỹ các chính sách của chỗ ở trước khi hoàn tất đặt chỗ.
            </div>
          </div>
        </div>

      </div>
      <div className="flex flex-col gap-y-4 min-w-100">
        <div className="flex flex-col rounded-4xl bg-white shadow-lg p-4 gap-y-2">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-[1.25rem] font-semibold">(1x) Dragon's Nest - Super Saver</h2>
            <div className="text-sm text-red-500">Chi con 1 phong</div>
          </div>

          <div className="flex bg-blue-50 rounded-[10px] p-1 gap-x-1">
            <div className="flex flex-col p-2 gap-y-1 flex-1">
              <div className="text-xs">Nhan phong</div>
              <div className="text-sm font-bold">Thứ Ba, 10 tháng 02 2026</div>
              <div className="text-xs">Từ 14:00</div>
            </div>
            
            <div className="flex flex-col justify-center items-center min-w-fit">
              <span className="text-xs font-semibold">1 đêm</span>
              <ArrowRight className="size-4" />
            </div>

            <div className="flex flex-col p-2 gap-y-1 flex-1">
              <div className="text-xs">Trả phong</div>
              <div className="text-sm font-bold">Thứ Ba, 10 tháng 02 2026</div>
              <div className="text-xs">Trước 12:00</div>
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <DoorOpen className="size-4" />
            <div className="text-sm font-semibold">2 khach</div>
            <div className="w-px bg-gray-500 h-3 mx-1"></div>
            <BedDouble className="size-4" />
            <ForkKnife className="size-4" />
          </div>
          <div className="flex gap-x-2 items-center">
            <ScrollText className="size-4" />
            <div className="text-sm text-green-700">Miễn phí hủy phòng trước 09 thg 2 2026</div>
          </div>
          <div className="flex gap-x-2 items-center">
            <CalendarCheck className="size-4" />
            <div className="text-sm text-green-700">Có thể đổi lịch</div>
          </div>
          <div className="flex gap-x-2">
            <Wifi className="size-4" />
            <CigaretteOff className="size-4" />
          </div>
        </div>

        <div className="flex flex-col rounded-4xl bg-white shadow-lg">
          <div className="flex px-4 py-2 gap-x-3 items-center">
            <TagIcon className="size-5" />
            <h2 className="text-[1.25rem] font-semibold">Chi tiết giá</h2>
          </div>

          <div className="flex flex-col text-xs text-gray-500 font-semibold bg-blue-50 px-4 py-3 gap-y-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-1">
                <div>Gia phong</div>
                <div>(xSo luong) Ten phong</div>
              </div>
              <div>654321 VND</div>
            </div>
            <div className="flex justify-between">
            <div>Thue va phi</div>
            <div>123456 VND</div>
            </div>
          </div>
          <div className="flex justify-between p-4 bg-[linear-gradient(313.11deg,rgb(247,252,222)18.59%,rgb(255,255,255)89.04%)]">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">Tong cong</div>
              <div className="text-sm text-gray-500">1 phong, 1 đêm</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-semibold text-gray-500 line-through">2345678</div>
              <div className="font-semibold text-orange-500">1234567</div>
            </div>
          </div>

          <Button className="m-4 rounded-full h-12 font-semibold">Tiep tuc</Button>
          <div className="text-xs text-gray-500 px-4 pb-4">
            {"Bằng cách tiến hành thanh toán, bạn đã đồng ý với "}
            <Link href="#" className="underline">Điều khoản và Điều kiện</Link>,
            <Link href="#" className="underline">Chính sách Bảo mật</Link>{", và "}
            <Link href="#" className="underline">Quy trình Hoàn tiền Lưu trú</Link>
            {" của Traveloka."}
          </div>

        </div>
      </div>
    </>
  )
};

// TODO: This should be a controlled form with validation
// TODO: Change to newer Shadcn Forms when available, which means move this into other file
function InformationForm () {
  return (
    <div className="w-full h-fit flex flex-col rounded-4xl bg-white shadow-lg p-4 gap-y-4">
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
          <Label htmlFor="full-name" className="text-xs font-semibold ml-1">Họ và tên</Label>
          <Input
            type="text"
            id="full-name"
            className={buttonVariants({ variant: "outline", size: "default", className: "h-10" })}
            placeholder="Nhập họ và tên"
          />
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
                    <ChevronDownIcon className="size-6 rounded-full bg-blue-50 p-1 transition-transform group-data-[state=open]:rotate-180" />
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
              {/* <input type="tel" id="phone-number" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại" /> */}
              <Input
                type="tel"
                id="phone-number"
                className={buttonVariants({ variant: "outline", size: "default", className: "flex-1 h-10" })}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: 0123456789</div>
          </div>
         <div className="w-full flex flex-col gap-y-1">
            <Label htmlFor="email" className="text-xs font-semibold ml-1">Email</Label>
            <Input
              type="email"
              id="email"
              className={buttonVariants({ variant: "outline", size: "default", className: "flex-1 h-10" })}
              placeholder="Nhập địa chỉ email"
            />
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: example@example.com</div>
          </div>
        </div>
      </div>

      {/** TODO: This is a form field */}
      <div className="flex items-center gap-x-2">
        <Checkbox id="consent" className="text-sm font-medium" />
        <Label htmlFor="consent" className="text-sm font-medium">
          Tôi đang đặt cho người khác
        </Label>
      </div>

      {/** TODO: This is a sub-form field, it is only visible when the previous checkbox is checked */}
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <UserIcon className="size-5" />
          <h2 className="text-xl font-semibold"> Thông tin khách hàng</h2>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Vui lòng điền đầy đủ các thông tin để nhận xác nhận đơn hàng
        </div>
      </div>

      <div className="flex flex-col rounded-4xl bg-blue-50 p-4">
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="full-name" className="text-xs font-semibold ml-1">Họ và tên khách hàng</Label>
          <Input
            type="text"
            id="full-name"
            className={buttonVariants({ variant: "outline", size: "default", className: "h-10" })}
            placeholder="Nhập họ và tên"
          />
          <div className="text-xs font-semibold text-gray-500 ml-1">như trên CMND (không dấu)</div>
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
            <Checkbox id={`special-request-${index}`} className="text-sm font-medium" />
            <Label htmlFor={`special-request-${index}`} className="text-sm font-medium">
              Yêu cầu đặc biệt {index + 1}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
