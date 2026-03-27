import Image from "next/image";
import Link from "next/link";
import { Info, MapPin, MapPinnedIcon, LucideFerrisWheel, Store } from "lucide-react";
import { fetchHotel } from "@/lib/actions/hotel";

export default function LocationSection({
  hotel
}: {
  hotel: Awaited<ReturnType<typeof fetchHotel>>
}) {
  if (!hotel) {
    return null;
  }

  const staticMapApiKey = process.env.NEXT_PUBLIC_GEOAPIFY_MAPS_API_KEY;
  const staticMapWidth = 928;
  const staticMapHeight = 300;
  const staticMapSrc = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${staticMapWidth}&height=${staticMapHeight}&center=lonlat:${hotel.longitude},${hotel.latitude}&zoom=14&pitch=0&marker=lonlat:${hotel.longitude},${hotel.latitude};type:awesome;color:%23e01401&apiKey=${staticMapApiKey}`;


  return (
    <section id="location" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">What's around {hotel?.name}</h2>
        <div className="flex space-x-2 text-sm items-center">
          <MapPin className="size-4"/>
          <div> {
            hotel?.ward.name + ", "
            + hotel?.ward.district.name + ", "
            + hotel?.ward.district.province.name
          } </div>
        </div>

        <div className="relative rounded-[2rem] w-full h-60 bg-gray-200 overflow-hidden">
          <Image
            src={staticMapSrc}
            alt=""
            fill
            className="absolute inset-0 object-cover w-full h-full z-0"
          />
          <Link href="#" className="absolute z-10 px-4 py-3 rounded-full font-semibold bg-blue-50 text-primary bottom-2 right-2 flex space-x-1">
            <span>Discover more places</span>
            <MapPinnedIcon className="size-6" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <MapPinnedIcon className="size-6" />
              <div className="font-semibold">Nearby Places</div>
            </div>
            <ul className="flex flex-col space-y-2 pl-8">
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <LucideFerrisWheel className="size-6" />
              <div className="font-semibold">Entertaiment and Atrractions</div>
            </div>
            <ul className="flex flex-col space-y-2 pl-8">
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <Store className="size-6" />
              <div className="font-semibold">Others</div>
            </div>
            <ul className="flex flex-col space-y-2 pl-8">
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>bla bla bla</div>
                  <div>bla distance</div>
                </div>
              </li>
            </ul>
          </div>


        </div>
        <div className="flex space-x-2 text-sm font-bold items-center">
          <Info className="size-3.5"/>
          <div>
            Distances shown are based on straight line distances. Actual travel distances may vary.
          </div>
        </div>

      </div>
    </section>
  )
}