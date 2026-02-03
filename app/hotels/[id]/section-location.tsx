import Link from "next/link";
import { Info, MapPin, MapPinnedIcon, LucideFerrisWheel, Store } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="w-full flex flex-col scroll-mt-30">
      <div className="rounded-[1.25rem] px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">what's around Location</h2>
        <div className="flex space-x-2 text-sm items-center">
          <MapPin className="size-4"/>
          <div>
            Location, location, location
          </div>
        </div>

        <div className="relative rounded-[2rem] w-full h-60 bg-gray-200">
          {/* <Image/> */}
          <Link href="#" className="absolute px-4 py-3 rounded-full font-semibold bg-blue-50 text-primary bottom-2 right-2  flex space-x-1">
            <span>
              Discover more places
            </span>
            <MapPinnedIcon className="size-6" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
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