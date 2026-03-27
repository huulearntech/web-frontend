"use client";

import Image from "next/image";
import { useImagePresentation } from "@/components/image-presentation";

export default function OverviewImagePresentation({ imageUrls }: { imageUrls: string[] }) {
  const { openAtIndex } = useImagePresentation();

  {/** Change this to another layout on non-large screen */ }
  return (
    <figure className="rounded-t-[10px] overflow-hidden grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-2 mx-3 h-auto lg:h-83">
      <Image
        src={imageUrls[0]}
        alt=""
        width={480}
        height={332}
        className="object-cover w-full h-full lg:row-span-2 lg:col-span-1"
        onClick={() => {
          console.log("open at index 0");
          openAtIndex(0);
        }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-2 h-full w-full lg:col-span-2 lg:row-span-2">
        {
          imageUrls.slice(1, 7).map((src, index) => (
            <Image
              key={index}
              src={src}
              alt=""
              width={400}
              height={300}
              className="w-full h-full object-cover"
              onClick={() => {
                console.log("open at index", index + 1);
                openAtIndex(index + 1);
              }}
            />
          ))
        }
      </div>
    </figure>
  );
}