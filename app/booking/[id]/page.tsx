import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

import InformationForm from "./information-form";
import PriceDetail from "./price-details";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CigaretteOff,
  DoorOpen,
  ForkKnife,
  ScrollText,
  Wifi
} from "lucide-react";

import imageGirlJump from "@/public/images/booking-page-remind-user-to-signin.webp";

import { InformationFormProvider, defaultValues as defaultInformationFormValues } from "./information-form-context";


export default async function BookingPage({ params }: { params: { id: string } }) {
  const session = await auth();

  return (
    <InformationFormProvider initialValues={defaultInformationFormValues}>
      {!session && (
        <div className="content mt-10 relative text-sm flex p-4 gap-x-4 pl-27.5 items-center justify-between rounded-xl bg-linear-to-b from-white to-[rgb(247,252,222)] shadow-lg">
          <Image src={imageGirlJump} width={85} height={74} alt="" className="absolute left-4 -top-7 w-[85px] object-contain" />
          Đăng nhập hoặc đăng ký để có giá rẻ hơn và nhiều ưu đãi hơn!
          <Link href={"/sign-in"} className="font-semibold text-primary"> Đăng nhập / Đăng ký </Link>
        </div>
      )}
      <main className="content grid gap-6 pt-6 pb-10 grid-cols-1 lg:grid-cols-[1fr_25rem] lg:items-start">
        <div className="order-2 lg:col-start-2 lg:row-start-1">
          <BookingSummary />
        </div>

        <div className="order-3 row-span-3 lg:col-start-1 flex flex-col gap-y-6 min-w-100">
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
        <div className="order-4 lg:col-start-2 lg:row-start-2">
          <PriceDetail />
        </div>
      </main>
    </InformationFormProvider>
  )
};

function BookingSummary() {
  return (
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
  )
}