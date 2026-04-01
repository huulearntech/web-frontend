import Image from "next/image";
import {
  bg_dalat,
  bg_danang,
  bg_halong,
  bg_hanoi,
  bg_hochiminh,
  bg_hoian,
  bg_hue,
  bg_nhatrang,
  bg_phanthiet,
  bg_phuquoc,
  bg_quynhon,
  bg_vungtau,
} from "@/public/images";


const top_destinations = [
  {
    regionName: "Đà Nẵng",
    backgroundImage: bg_danang,
  },
  {
    regionName: "Nha Trang",
    backgroundImage: bg_nhatrang,
  },
  {
    regionName: "Phú Quốc",
    backgroundImage: bg_phuquoc,
  },
  {
    regionName: "Vũng Tàu",
    backgroundImage: bg_vungtau,
  },
  {
    regionName: "Hà Nội",
    backgroundImage: bg_hanoi,
  },
  {
    regionName: "Đà Lạt",
    backgroundImage: bg_dalat,
  },
  {
    regionName: "Hội An",
    backgroundImage: bg_hoian,
  },
  {
    regionName: "Phan Thiết",
    backgroundImage: bg_phanthiet,
  },
  {
    regionName: "Quy Nhơn",
    backgroundImage: bg_quynhon,
  },
  {
    regionName: "Huế",
    backgroundImage: bg_hue,
  },
  {
    regionName: "Hồ Chí Minh",
    backgroundImage: bg_hochiminh,
  },
  {
    regionName: "Hạ Long",
    backgroundImage: bg_halong,
  },
];

export default function TopDestinationsSection () {
  return (
    <section className="flex flex-col gap-y-6 content">
      <h2 className="text-[26px] font-bold"> Ưu đãi khách sạn tốt nhất tại các điểm đến phổ biến </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {top_destinations.map((dest, index) => (
            <div key={index} className="group relative rounded-[10px] overflow-hidden transition-all flex flex-col hover:cursor-pointer">
              <Image
                key={index}
                src={dest.backgroundImage}
                alt=""
                className="rounded-md object-cover -z-10 h-40 w-full"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 duration-300"></div>
              <div className="absolute top-0 left-0 right-0 p-4 text-white">
                <h3 className="lg:text-[20px] font-semibold whitespace-pre-wrap wrap-break-word">{dest.regionName}</h3>
              </div>
              <div className="absolute bottom-0 group-hover:bottom-8 opacity-0 group-hover:opacity-100 duration-300
             text-white border border-white rounded-[10px] px-4 py-2 text-xs text-center font-semibold left-1/2 -translate-x-1/2">
                Xem thêm chỗ nghỉ
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}