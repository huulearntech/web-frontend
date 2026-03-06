import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";

import { fake_locations } from "@/old/mock_data";
import { fetchSearchResult } from "@/lib/actions/user-search-hotel";
import { HotelCard } from "@/components/hotel-card copy";

// This can be named as Promotion, because admin can "promote" things
export default async function Feed () { // This should be modifiable by admin
  const hotels = await fetchSearchResult();
  const locations = fake_locations;
  const title = "Di choi cuoi tuan gan nha"
  return (
    <section className="flex flex-col gap-y-4">
      <div className="content">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <Tabs
        defaultValue={locations[0]}
        className="content"
      >
        <div className="overflow-x-auto justify-start">
          <TabsList className="bg-inherit gap-x-2" >
            {locations.map((location) => (
              <TabsTrigger value={location} key={location}
                className="h-9 text-sm font-bold px-3 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 bg-accent text-foreground dark:text-muted-foreground data-[state=active]:shadow-sm"
              >
                {location}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {locations.map((location) => (
          <TabsContent value={location} key={location}>
            <Carousel opts={{ align: "start" }}
            >
              <CarouselContent className="p-2">
                {hotels.concat(hotels).map((hotel, index) => (
                  <CarouselItem
                    key={hotel.id + index}
                    className="basis-1/2 md:basis-1/3 xl:basis-1/4"
                  >
                    {/** Decimal is non serializable here */}
                    <HotelCard hotel={hotel} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext className="max-lg:hidden"/>
              <CarouselPrevious className="max-lg:hidden"/>
            </Carousel>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}