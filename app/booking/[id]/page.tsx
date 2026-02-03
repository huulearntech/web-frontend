import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  ChevronDownIcon,
  CigaretteOff,
  DoorOpen,
  ForkKnife,
  MailIcon,
  ScrollText,
  TagIcon,
  Wifi
} from "lucide-react";


export default function BookingPage() {
  return (
    <>
      <InformationForm />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col rounded-[20px] bg-white shadow-lg p-4 gap-y-2">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-[1.25rem] font-semibold">(1x) Dragon's Nest - Super Saver</h2>
            <div className="text-sm text-red-500">Chi con 1 phong</div>
          </div>

          <div className="flex bg-blue-50 rounded-[10px] p-1 gap-x-1">
            <div className="flex flex-col p-2 gap-y-1 w-32.5">
              <div className="text-xs">Nhan phong</div>
              <div className="text-sm font-bold">Thứ Ba, 10 tháng 02 2026</div>
              <div className="text-xs">Từ 14:00</div>
            </div>
            
            <div className="flex flex-col flex-1 justify-center items-center">
              <div className="text-xs font-semibold">1 đêm</div>
              <ArrowRight className="size-4" />
            </div>

            <div className="flex flex-col p-2 gap-y-1 w-32.5">
              <div className="text-xs">Nhan phong</div>
              <div className="text-sm font-bold">Thứ Ba, 10 tháng 02 2026</div>
              <div className="text-xs">Từ 14:00</div>
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

        <div className="flex flex-col rounded-[20px] bg-white shadow-lg">
          <div className="flex px-4 py-2 gap-x-3 items-center">
            <TagIcon className="size-5" />
            <h2 className="text-[1.25rem] font-semibold">Chi tiết giá</h2>
          </div>

          <div className="flex flex-col bg-blue-50 px-4 py-3 gap-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs">ten phong</div>
              <div className="text-xs">price</div>
            </div>
            <div className="text-xs">Thue va phi</div>
          </div>
          <div className="flex flex-col p-4 bg-[linear-gradient(313.11deg,rgb(247,252,222)18.59%,rgb(255,255,255)89.04%)]">
            <div className="text-xs font-semibold">Tong cong</div>
            <div className="text-xs font-semibold">1 phong, 1 đêm</div>
          </div>

          <Button className="m-4 rounded-full">Tiep tuc</Button>

        </div>
      </div>
    </>
  )
};

function InformationForm () {
  return (
    <div className="w-full h-fit flex flex-col rounded-[20px] bg-white shadow-lg p-4 gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <MailIcon className="size-5" />
          <h2 className="text-xl font-semibold"> Liên hệ đặt chỗ </h2>
        </div>
        <div className="text-sm font-medium text-gray5400">
          Thêm liên hệ để nhận xác nhận đặt chỗ.
        </div>
      </div>
      

      <div className="flex flex-col gap-y-4 rounded-[20px] bg-blue-50 p-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="full-name" className="text-xs font-semibold ml-1">Họ và tên</label>
          <input type="text" id="full-name" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên" />
          <div className="text-xs font-semibold text-gray-500 ml-1">như trên CMND (không dấu)</div>
        </div>
        <div className="w-full flex gap-x-6">
          <div className="w-full flex flex-col gap-y-1">
            <label htmlFor="phone-number" className="text-xs font-medium ml-1">Số điện thoại</label>
            <div className="flex gap-x-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-full ring ring-accent hover:bg-transparent group">
                    bla bla
                    <ChevronDownIcon className="size-6 rounded-full bg-blue-50 p-1 data-[group]:" />
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
              <input type="tel" id="phone-number" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại" />
            </div>
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: 0123456789</div>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label htmlFor="email" className="text-xs font-medium ml-1">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập địa chỉ email" />
            <div className="text-xs font-semibold text-gray-500 ml-1">VD: example@example.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
