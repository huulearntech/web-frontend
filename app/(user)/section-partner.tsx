"use client";

import Image from "next/image";
import * as hotel_partner_logos from "@/public/logos/hotel-partners";
import * as payment_partner_logos from "@/public/logos";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";

export default function PartnersSection() {
  return (
    <>
      <section className="flex flex-col justify-center gap-y-4 content">
        <h4 className="text-2xl font-bold">Đối tác khách sạn</h4>
        <p className="text-sm">
          Khách sạn trong nước và quốc tế
        </p>
        <p>
          Chúng tôi hợp tác với các chuỗi khách sạn trên toàn thế giới để bảo đảm mang lại kỳ nghỉ tuyệt vời nhất tại mọi điểm đến trong mơ của bạn!
        </p>
        <Carousel
          opts={{ loop: true, dragFree: true }}
          plugins={[
            Autoscroll({
              speed: 1,
              playOnInit: true,
              stopOnInteraction: false,
            })
          ]}
          className="w-full"
        >
          <CarouselContent>
            {Object.values(hotel_partner_logos).map((logo, index) => (
              <CarouselItem key={index} className="basis-1/8 w-fit flex justify-center items-center">
                <Image
                  src={logo} alt=""
                  className="h-10 w-auto object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="flex flex-col justify-center gap-y-4 content">
        <h4 className="text-2xl font-bold">Đối tác thanh toán</h4>
        <p>
          Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn luôn an tâm thực hiện mọi giao dịch một cách thuận lợi nhất!
        </p>
        <Carousel
          opts={{ loop: true, dragFree: true }}
          plugins={[
            Autoscroll({
              speed: 1,
              playOnInit: true,
              stopOnInteraction: false,
            })
          ]}
          className="w-full"
        >
          <CarouselContent>
            {Object.values(payment_partner_logos).map((logo, index) => (
              <CarouselItem key={index} className="basis-1/8 w-fit flex justify-center items-center">
                <Image
                  src={logo} alt=""
                  className="h-10 w-auto object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
}