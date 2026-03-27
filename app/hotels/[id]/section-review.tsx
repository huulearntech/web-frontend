import Image from "next/image"
import { tvlk_favicon, tvlk_logo_text_dark } from "@/public/logos"
import { ThumbsUp } from "lucide-react"

import { differenceInDays, differenceInWeeks } from "date-fns"
import { Hotel } from "@/lib/generated/prisma/client";

import prisma from "@/lib/prisma";

export const fetchReviewsForHotel = async (hotelId: string) => {
  "use server";

  const reviews = await prisma.review.findMany({
    where: { booking: { hotelId: hotelId } },
    orderBy: { createdAt: "desc" },
    take: 5, // TODO: pagination, filter
    include: {
      booking: {
        select: {
          user: {
            select: {
              name: true,
            }
          }
        }
      }
    }
  });

  return reviews;
}

export default async function ReviewSection({ hotel }: { hotel: Hotel }) {
  const reviews = await fetchReviewsForHotel(hotel.id);

  const reviewTexts = ["Kém", "Trung bình", "Tốt", "Rất tốt", "Tuyệt vời"];

  const reviewPoints = hotel.reviewPoints;
  const totalReviews = reviews.length; // TODO: resolve reviews.length vs hotel.numberOfReviews
  const ratingText = totalReviews === 0 ? "Chua co danh gia" :  reviewTexts[Math.min(reviewTexts.length - 1, Math.floor(reviewPoints / 2))];
  const criterias = [
    { name: "Vệ sinh", percentage: 90 },
    { name: "Tiện nghi phòng", percentage: 85 },
    { name: "Đồ ăn", percentage: 80 },
    { name: "Vị trí", percentage: 95 },
    { name: "Dịch vụ và tiện ích", percentage: 88 },
  ];

  return (
    <section id="review" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Những review của khách về {hotel.name}</h2>
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-6 lg:gap-y-0 lg:gap-x-12">
          <div className="flex space-x-12 flex-1">
            {totalReviews > 0 &&
              <div className="flex shrink-0 items-center justify-center size-32 rounded-4xl bg-linear-[137deg] from-[rgb(245,251,255)] from-0% via-[rgb(209,240,255)] via-[46.1%] to-[rgb(245,251,255)] to-[96.84%]">
                <div className="flex items-center justify-center size-24 border-4 border-white rounded-3xl">
                  <div className="text-center text-[3rem] font-bold text-primary">{reviewPoints}</div>
                </div>
              </div>
            }
            <div className="flex flex-col space-y-3">
              <div className="text-[2rem] font-bold text-primary">{ratingText}</div>
              {totalReviews > 0 &&
                <div className="text-[1.25rem] font-bold">Từ {totalReviews} đánh giá</div>
              }
              <div className="font-medium flex">
                <div className="whitespace-pre">Bởi khách du lịch trong </div>
                <Image src={tvlk_logo_text_dark} alt="traveloka" className="h-6.25 w-auto"/>
              </div>
            </div>
          </div>

          {totalReviews > 0 &&
            <ul className="flex flex-col flex-1">
              {criterias.map(({ name, percentage }) => (
                <li key={name}>
                  <div className="flex justify-between items-center">
                    <div>{name}</div>
                    <ProgressBar percentage={percentage} />
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>

        <ul className="flex flex-col gap-y-3">
          {reviews.map((review) => (
            <li key={review.id}> <ReviewCard review={review} /> </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Awaited<ReturnType<typeof fetchReviewsForHotel>>[number] }) {
  return (
    <div className="p-6 rounded-[0.375rem] border flex gap-x-12">
      <div className="flex flex-col items-center gap-y-2">
        <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-[2rem] font-bold">A</div>
        <div className="font-bold">{review.booking.user.name}</div>
      </div>

      <div className="flex flex-col flex-1 gap-y-3">
        <div className="flex space-x-4 items-center">
          <div className="px-2.5 py-0.5 rounded-full bg-blue-50 flex items-center justify-center space-x-1">
            <Image src={tvlk_favicon} alt="" aria-hidden className="size-4.5"/>
            <div className="flex items-end gap-x-0.5">
              <div className="text-primary font-bold">{review.rating}</div>
              <div className="text-sm font-medium">/</div>
              <div className="text-sm font-medium">10</div>
            </div>
          </div>

          <div className="text-sm font-bold">
            Đánh giá cách đây {
              // TODO: improve this logic
              differenceInWeeks(new Date(), new Date(review.createdAt)) >= 1
                ? `${differenceInWeeks(new Date(), new Date(review.createdAt))} tuần`
                : `${differenceInDays(new Date(), new Date(review.createdAt))} ngày`
            } 
          </div>
        </div>

        <p className="text-sm font-medium">{review.comment}</p>
        <div className="flex items-center space-x-2">
          <ThumbsUp className="size-5"/>
          <div className="text-sm font-bold text-primary">Đánh giá này hữu ích không?</div>
        </div>
      </div>
    </div>
  )
};

function ProgressBar({ percentage }: { percentage: number }) {
  const pct = Math.min(Math.max(0, percentage), 100);

  return (
    <div className="bg-blue-50 rounded-full h-3 w-50 overflow-hidden relative">
      <div
        className={"absolute left-0 top-0 h-full bg-primary"}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}