import Image from "next/image";
import Link from "next/link";
import { Info, MapPin, MapPinnedIcon, LucideFerrisWheel, Store } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">what's around Location</h2>
        <div className="flex space-x-2 text-sm items-center">
          <MapPin className="size-4"/>
          <div>
            Location, location, location
          </div>
        </div>

        <div className="relative rounded-[2rem] w-full h-60 bg-gray-200">
          {/* <Image
            // src={"https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDDvRZqtRfcu2gynuJTpE2ODnR-3p6bWfk&center=16.04927195641161,108.24723763068846&size=928x300&zoom=15&&markers=scale:2%7Cicon:https://ik.imagekit.io/tvlk/image/imageResource/2025/08/20/1755663486439-3f098335826f81a9ee76a342a218d2f6.png%7C16.04927195641161,108.24723763068846&markers=scale:2%7Cicon:https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726732409-4d47101e13345dffff6d8b08aa6ad7f0.png%7C16.04701,108.25001&markers=scale:2%7Cicon:https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726732409-4d47101e13345dffff6d8b08aa6ad7f0.png%7C16.06705542309904,108.24580192565918&markers=scale:2%7Cicon:https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726726363-44a43118fd320526eea2f316e6346818.png%7C16.062141179989624,108.23190685889551&markers=scale:2%7Cicon:https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726732409-4d47101e13345dffff6d8b08aa6ad7f0.png%7C16.0612102,108.22697579999999&style=feature:administrative|element:labels.text.fill|color:0x666666&style=feature:administrative.province|element:labels.text.fill|color:0x333333&style=feature:landscape|element:geometry|color:0xf7f3ef&style=feature:landscape|element:labels.text.fill|color:0x666666&style=feature:landscape|element:labels.icon|color:0x71d0b9&style=feature:landscape.natural.landcover|element:geometry|color:0xd3eddb&style=feature:poi|element:geometry|visibility:off&style=feature:poi|element:labels.text.fill|color:0x666666&style=feature:poi.attraction|element:labels.icon|visibility:on|color:0xff918e&style=feature:poi.business|element:all|visibility:off&style=feature:poi.business.shopping|element:all||visibility:on&style=feature:poi.business.food_and_drink|element:all||visibility:on&style=feature:poi.business.shopping|element:labels.icon|color:0xc0b4f8&style=feature:poi.business.food_and_drink|element:labels.icon|color:0xffcfaa&style=feature:poi.government|element:all|visibility:off&style=feature:poi.medical|element:all|visibility:off&style=feature:poi.park|element:geometry|visibility:on|color:0xd3eddb&style=feature:poi.park|element:labels.icon|color:0x80c995|visibility:on&style=feature:poi.place_of_worship|element:labels.icon|color:0x9f9f9f&style=feature:poi.school|element:all|visibility:off&style=feature:poi.sports_complex|element:all|visibility:off&style=feature:road|element:geometry.fill|color:0xffffff&style=feature:road|element:geometry.stroke|visibility:off&style=feature:road|element:labels.text.fill|color:0xadadad&style=feature:road|element:labels.text.stroke|visibility:off&style=feature:road|element:labels.icon|visibility:off&style=feature:transit|element:labels.text.fill|color:0x666666&style=feature:transit.line|element:all|visibility:off&style=feature:transit.station.airport|element:labels.icon|visibility:on|color:0x30c5f7&style=feature:transit.station.bus|element:labels.icon|color:0xb8b8ba&style=feature:transit.station.rail|element:labels.icon|color:0xb8b8ba&style=feature:water|element:geometry.fill|color:0xdaefff&style=feature:water|element:labels.text.fill|color:0x666666&language=en&tr=h-300,w-928"}
            alt=""
            width={928}
            height={300}
          /> */}
          <Link href="#" className="absolute px-4 py-3 rounded-full font-semibold bg-blue-50 text-primary bottom-2 right-2  flex space-x-1">
            <span>
              Discover more places
            </span>
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