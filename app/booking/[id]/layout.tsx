import Image from "next/image"

import { tvlk_logo_text_dark } from "@/public/logos"
import { RatingStars } from "@/components/hotel-card"

export default function Layout({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="w-full h-20 z-60 bg-white shadow-md sticky top-0">
        <div className="flex h-full justify-between items-center content">
          <div className="flex items-center">
            <Image src={tvlk_logo_text_dark} alt="Traveloka Header Logo" />
            <div className="h-10 w-px bg-gray-200 mx-3"></div>
            <div className="flex flex-col gap-y-1 p-4">
              <div className="text-base text-black font-semibold">
                Hotel name goes here
              </div>
              <div className="flex items-center gap-x-2 text-xs">
                <RatingStars rating={4.5} />
                <span className="text-primary font-black">8.7/10</span>
                <span className="text-gray-500 font-semibold">(200 reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-16">
            Stepper go here
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-[url('/images/bg-booking-page.webp')] bg-no-repeat bg-bottom">
        <main className="content flex flex-col lg:flex-row lg:gap-x-6 py-10">
          {children}
        </main>
      </div>
    </>
  )
}