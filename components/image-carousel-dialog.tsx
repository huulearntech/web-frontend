"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


// TODO: fix padding of thumbs
// TODO: When integrating, maybe dialog trigger is not needed but use external trigger
// -> open, setOpen, openedFromIndex
// So making a Context wrapping this is a good idea
export default function ImageCarouselDialog ({
  imageSources,
  className,
  dialogClassName,
  // open,
  // setOpen,
  // openedFromIndex,
} : {
  imageSources: string[];
  className?: string;
  dialogClassName?: string;
  // open: boolean;
  // setOpen: (open: boolean) => void;
  // openedFromIndex?: number;
}) {
  if (imageSources.length === 0) {
    console.warn("ImageCarouselDialog: imageSources array is empty.");
    return null;
  }

  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [thumbsApi, setThumbsApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMainSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelectedIndex(idx);
    thumbsApi.scrollTo(idx, false); // keep thumbnail carousel in view
  }, [mainApi, thumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    handleMainSelect(); // sync initial

    mainApi.on("select", handleMainSelect);
    mainApi.on("reInit", handleMainSelect);

    return () => {
      mainApi.off("select", handleMainSelect);
      mainApi.off("reInit", handleMainSelect);
    };
  }, [mainApi, handleMainSelect]);


  const handleThumbSelect = useCallback((index: number) => {
    if (!mainApi || !thumbsApi) return;
    mainApi.scrollTo(index, true);
  }, [mainApi, thumbsApi]);

  return (
    <Dialog>
      <DialogTrigger asChild
        className={cn(
          "w-100 h-auto",
          className
        )}
      >
          <Image
            src={imageSources[0]}
            alt="" // FIXME: add alt text
            width={400}
            height={300}
            className="object-cover" // placeholder
          />
      </DialogTrigger>

      <DialogContent className={cn(
        "sm:max-w-[min(90vw,var(--container-6xl))] p-4",
        dialogClassName
      )}
      >
        <DialogHeader>
          <DialogTitle>Image Gallery</DialogTitle>
          <DialogDescription>
            Browse through the images using the carousel below.
          </DialogDescription>
        </DialogHeader>

        <Carousel setApi={setMainApi} className="group/icd">
          <CarouselContent>
            {imageSources.map((src, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`} // FIXME: improve alt text
                  width={800}
                  height={600}
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 invisible md:group-hover/icd:visible disabled:hidden" />
          <CarouselNext className="right-2 invisible md:group-hover/icd:visible disabled:hidden" />
        </Carousel>

        <Carousel
          orientation="horizontal"
          setApi={setThumbsApi}
          opts={{ containScroll: "keepSnaps", dragFree: true, }}
        >
          <CarouselContent className="py-1 h-16">
            {imageSources.map((src, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center basis-1/5"
              >
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "p-0 overflow-hidden rounded-md",
                    selectedIndex === index ? "ring-2 ring-primary" : "border"
                  )}
                  onClick={() => handleThumbSelect(index)}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${index + 1}`} // FIXME: improve alt text
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <DialogFooter>
          <p className="italic text-xs text-gray-500">*Lưu ý: Hoteloka không chịu trách nhiệm về tính xác thực của ảnh mà khách sạn đăng tải</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}