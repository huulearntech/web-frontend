import { Accessibility, AirVent, Bed, Building2, CarTaxiFront, DoorClosed, ForkKnifeCrossed, Store, Wifi } from "lucide-react";

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="w-full flex flex-col scroll-mt-30">
      <div className="rounded-[1.25rem] px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]"> Tất cả những tiện ích tại Nature Hotel - Le Hong Phong </h2>
        <div className="flex flex-wrap gap-y-4">
          <div className="w-1/3 flex flex-col space-y-2">
          <div className="flex space-x-2 items-center font-bold">
            <Bed className="size-6" />
            <span>Hotel services</span>
          </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <Building2 className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <DoorClosed className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <AirVent className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <Store className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <ForkKnifeCrossed className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <CarTaxiFront className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <Wifi className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center font-bold">
            <Accessibility className="size-6" />
            <span>Public Facilities</span>
            </div>
            <ul className="flex flex-col space-y-2 text-sm pl-8">
              {Array.from({ length: 5 }, () => "bla").map((bla, index) => (
                <li key={index} className="list-disc">
                  {bla + index}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}