"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";


// TODO: this should solve the problem of online images with unknown width and height
export default function ImageCarouselDialog ({
  src, // src for what?
  alt, // alt for what?
  className // className for Trigger? Dialog?
} : {
  src: string,
  alt: string,
  className: string,
}) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src} // FIXME: fix this as how to propagate the sources via props
          alt={alt}
          fill
          className="object-cover"
        />
      </DialogTrigger>

      <DialogContent>
        <Carousel>
          {

          }
        </Carousel>
        <CarouselPrevious />
        <CarouselNext />
      </DialogContent>
    </Dialog>
  )
}