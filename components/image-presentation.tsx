"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

type ImagePresentationType = { openAtIndex: (index: number) => void; };

const ImagePresentationContext = createContext<ImagePresentationType | undefined>(undefined);

function useImagePresentation() {
  const ctx = useContext(ImagePresentationContext);
  if (!ctx) throw new Error("useImagePresentation must be used within ImagePresentationProvider");
  return ctx;
}

function ImagePresentation({
  imageSources,
  children,
  className,
  title,
  description,
  footer,
}: {
  imageSources: string[];
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (imageSources.length === 0) {
    console.warn("ImagePresentation: imageSources array is empty.");
    return (
      <div className={cn("flex flex-col items-center justify-center p-8", className)}>
        <p className="text-muted-foreground">No images to display.</p>
      </div>
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //============= Embla carousel related ==================
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [thumbsApi, setThumbsApi] = useState<CarouselApi | null>(null);
  const onMainSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelectedIndex(idx); thumbsApi.scrollTo(idx, false); // keep thumbnail carousel in view
  }, [mainApi, thumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onMainSelect(); // sync initial
    mainApi.on("select", onMainSelect).on("reInit", onMainSelect);
    return () => { mainApi.off("select", onMainSelect).off("reInit", onMainSelect); };
  }, [mainApi, onMainSelect]);

  const onThumbsSelect = useCallback((index: number) => {
    if (!mainApi || !thumbsApi) return;
    mainApi.scrollTo(index, true);
    setSelectedIndex(index);
  }, [mainApi, thumbsApi]);

  //=======================================================

  const openAtIndex = useCallback((index: number) => {
    if (!mainApi || !thumbsApi) return;
    setSelectedIndex(index);
    setIsOpen(true);
    mainApi.scrollTo(index, false);
    thumbsApi.scrollTo(index, false);
  }, [mainApi, thumbsApi, setSelectedIndex, setIsOpen]);

  return (
    <ImagePresentationContext.Provider value={{ openAtIndex }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(
            "sm:max-w-[min(90vw,var(--container-6xl))] p-4",
            className
          )}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription> {description} </DialogDescription>
          </DialogHeader>

          <Carousel setApi={setMainApi} className="group/icd">
            <CarouselContent>
              {imageSources.map((src, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
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
                      { "ring-2 ring-primary" : selectedIndex === index },
                    )}
                    onClick={() => onThumbsSelect(index)}
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

          <DialogFooter> {footer} </DialogFooter>
        </DialogContent>
      </Dialog>
    </ImagePresentationContext.Provider>
  );
}

export {
  ImagePresentation,
  useImagePresentation,
}