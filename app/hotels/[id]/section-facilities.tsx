import {
  Accessibility,
  AirVent,
  Bed,
  Building2,
  CarTaxiFront,
  DoorClosed,
  ForkKnifeCrossed,
  Store,
  Wifi
} from "lucide-react";

type FacilityCategory = {
  name: string;
  icon: React.ReactNode;
  facilities: string[];
}

export const fake_facility_categories: FacilityCategory[] = [
  {
    name: "Hotel Services",
    icon: <Bed className="size-6" />,
    facilities: [
      "24-hour front desk",
      "Concierge service",
      "Room service",
      "Laundry service",
      "Luggage storage",
    ],
  },
  {
    name: "Public Facilities",
    icon: <Building2 className="size-6" />,
    facilities: [
      "Elevator",
      "Non-smoking rooms",
      "Heating",
      "Air conditioning",
      "Designated smoking area",
    ],
  },
  {
    name: "Ẩm thực",
    icon: <ForkKnifeCrossed className="size-6" />,
    facilities: [
      "Nhà hàng có máy lạnh",
      "Bữa tối với thực đơn gọi món",
      "Quầy bar",
      "Bữa sáng món tự chọn",
      "Bữa sáng phục vụ tại bàn",
      "Bữa sáng (thu phí)",
      "Tiệm cà phê",
      "Bữa sáng kiểu Âu",
    ],
  },
  {
    name: "Tiện nghi công cộng",
    icon: <Store className="size-6" />,
    facilities: [
      "Bãi đậu xe",
      "Cà phê/trà tại sảnh",
      "Tiệm cà phê",
      "Nhận phòng sớm",
      "Thang máy",
    ],
  },
  {
    name: "Tiện nghi phòng",
    icon: <Bed className="size-6" />,
    facilities: [
      "Áo choàng tắm",
      "Truyền hình cáp",
      "Bàn làm việc",
      "Máy sấy tóc",
      "Két an toàn trong phòng",
    ],
  },
  {
    name: "Hỗ trợ người khuyết tật",
    icon: <Accessibility className="size-6" />,
    facilities: [
      "Phòng được trang bị phù hợp cho người khuyết tật",
      "Phòng tắm phù hợp cho người khuyết tật",
      "Chỗ đậu xe cho người khuyết tật",
      "Thuận tiện cho người khuyết tật",
    ],
  },
  {
    name: "Tiện nghi chung",
    icon: <Building2 className="size-6" />,
    facilities: [
      "Phòng giữ đồ",
      "Phòng gia đình",
      "Phòng không hút thuốc",
      "Khu vực hút thuốc",
    ],
  },
  {
    name: "Các hoạt động",
    icon: <AirVent className="size-6" />,
    facilities: [
      "Khu vui chơi trẻ em",
      "Trung tâm thể dục thể hình",
      "Vườn hoa",
      "Mát-xa",
    ],
  },
  {
    name: "Vận chuyển",
    icon: <CarTaxiFront className="size-6" />,
    facilities: [
      "Cho thuê xe hơi",
      "Bãi đậu xe an ninh",
      "Bãi đậu xe có người phục vụ",
    ],
  },
  {
    name: "Kết nối mạng",
    icon: <Wifi className="size-6" />,
    facilities: ["Wi-Fi miễn phí trong tất cả các phòng"],
  },
];

export default function FacilitiesSection({
  facilities,
  hotelName,
}: {
  facilities: FacilityCategory[];
  hotelName: string;
}) {
  return (
    <section id="facilities" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]"> Tất cả những tiện ích tại {hotelName} </h2>
        <div className="grid grid-cols-3 gap-4">
          {facilities.map((category, index) => (
            <div key={index} className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-2">
                {category.icon}
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
              <ul className="list-disc list-inside flex flex-col gap-y-1">
                {category.facilities.map((facility, idx) => (
                  <li key={idx} className="text-sm">
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}