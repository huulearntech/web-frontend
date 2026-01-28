import { ArrowRight, BedDouble, CalendarCheck, CigaretteOff, DoorOpen, ForkKnife, ScrollText, Wifi } from "lucide-react";

export default function BookingPage() {
  return (
    <main className="flex">
      <div className="flex flex-col">

      </div>
      <div className="flex flex-col">
        <div className="flex flex-col rounded-4xl bg-white shadow-lg p-4 gap-y-2">
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



      </div>

    </main>
  )
}