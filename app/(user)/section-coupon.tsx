import { coupons } from "@/old/mock_data";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Coupon from "@/components/coupon";


export default function CouponSection () {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="content flex flex-col gap-y-1">
        <h2 className="text-[26px] font-bold"> Mã giảm cho bạn </h2>
        <p> Chỉ áp dụng trên App! </p>
      </div>
      <div>
        <Tabs defaultValue={Object.keys(coupons)[0]} className="content">
          <div className="overflow-x-auto justify-start">
            <TabsList
            className="bg-inherit gap-x-2"
            >
              {Object.keys(coupons).map((coupon_type) => (
                <TabsTrigger value={coupon_type} key={coupon_type}
              className={
                // Check this on dark mode
                "h-9 text-sm font-bold px-3 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 bg-accent text-foreground dark:text-muted-foreground data-[state=active]:shadow-sm"
              }
                >
                  {coupon_type}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(coupons).map(([coupon_type, coupons_of_type]) => (
            <TabsContent value={coupon_type} key={coupon_type}>
              <Carousel
                opts={{
                  align: "start"
                }}
              >
                <CarouselContent className="p-2">
                  {coupons_of_type.map((coupon, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/4">
                      <Coupon coupon={coupon} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="max-lg:hidden" />
                <CarouselPrevious className="max-lg:hidden" />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
};