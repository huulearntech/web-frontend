import Image from "next/image"
import { tvlk_favicon, tvlk_logo_text_dark } from "@/public/logos"
import { ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ReviewSection() {
  return (
    <section id="review" className="w-full flex flex-col scroll-mt-30">
      <div className="rounded-[1.25rem] px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Những review của khách về bla bla bla</h2>
        <div className="flex items-center">
          <div className="flex space-x-12 flex-1">
            <div className="flex items-center justify-center size-32 rounded-[1.25rem] bg-linear-[137deg] from-[rgb(245,251,255)] from-0% via-[rgb(209,240,255)] via-[46.1%] to-[rgb(245,251,255)] to-[96.84%]">
              <div className="flex items-center justify-center size-24 border-4 border-white rounded-[1rem]">
                <div className="text-center text-[3rem] font-bold text-primary">9.2</div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="text-[2rem] font-bold text-primary">Xuất sắc</div>
              <div className="text-[1.25rem] font-bold">Từ 25 đánh giá</div>
              <div className="font-medium flex">
                <div className="whitespace-pre">Bởi khách du lịch trong </div>
                <Image src={tvlk_logo_text_dark} alt="traveloka" className="h-[25px] w-auto"/>
              </div>
            </div>
          </div>

          <ul className="flex flex-col flex-1">
            { ["Vệ sinh", "Tiện nghi phòng", "Đồ ăn", "Vị trí", "Dịch vụ và tiện ích"].map((category, index) => (
              <li key={category}>
                <div className="flex justify-between items-center">
                  <div>{category}</div>
                  <ProgressBar percentage={index * 20} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col gap-y-3">
          {
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <ReviewCard />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

function ReviewCard() {
  return (
    <div className="p-6 rounded-[0.375rem] border flex">
      <div className="flex items-start space-x-4 w-1/4">
        <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-[2rem] font-bold">A</div>
        <div className="font-bold">Nguyen Van A</div>
      </div>

      <div className="flex flex-col flex-1 gap-y-3">
        <div className="flex space-x-4 items-center">
          <div className="px-2.5 py-0.5 rounded-full bg-blue-50 flex items-center justify-center space-x-1">
            <Image src={tvlk_favicon} alt="" aria-hidden className="size-4.5"/>
            <div className="flex items-end gap-x-0.5">
              <div className="text-primary font-bold">9.5</div>
              <div className="text-sm font-medium">/</div>
              <div className="text-sm font-medium">10</div>
            </div>
          </div>

          <div className="text-sm font-bold">
            Đánh giá cách đây 3 tuần
          </div>
        </div>

        <p className="text-sm font-medium">Không gian và không khí dễ chịu, dịch vụ tốt. Sẽ quay lại và ủng hộ</p>
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