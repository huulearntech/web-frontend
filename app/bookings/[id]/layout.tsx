import Image from "next/image"

import { tvlk_logo_text_dark } from "@/public/logos"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation";
import { MAX_REVIEW_POINTS } from "@/lib/constants";

export default async function Layout({
  children,
  // params,
} : Readonly<{
  children: React.ReactNode
  // params: Promise<{ id: string }>
}>) {
  // const { id: bookingId } = await params;
  const hotel = await prisma.hotel.findFirst({
    select: {
      reviewPoints: true,
      name: true,
      numberOfReviews: true,
    },
  });

  if (!hotel) notFound();

  return (
    <>
      <header className="w-full h-20 z-60 bg-white shadow-md sticky top-0">
        <div className="flex h-full justify-between items-center content">
          <div className="flex items-center">
            <Image src={tvlk_logo_text_dark} alt="Traveloka Header Logo" />
            <div className="h-10 w-px bg-gray-200 mx-3"></div>
            <div className="flex flex-col gap-y-1 p-4">
              <div className="text-base text-black font-semibold">
                {hotel.name}
              </div>
              <div className="flex items-center gap-x-2 text-xs">
                {/* <RatingStars rating={4.5} /> Replace Rating stars with review point */}
                <span className="text-primary font-black">{hotel.reviewPoints.toFixed(1) + " / " + MAX_REVIEW_POINTS}</span>
                <span className="text-gray-500 font-semibold">({hotel.numberOfReviews} đánh giá)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-16">
            Stepper go here
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-[url('/images/bg-booking-page.webp')] bg-no-repeat bg-bottom">
        {children}
      </div>
    </>
  )
}