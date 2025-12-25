"use client";

import { useState } from "react";
import Image from "next/image";
import type { CouponProps } from "@/lib/definitions";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "./ui/dialog";
import { toast } from "sonner";

import { hotel } from "@/public/icons"
import { Info, Copy, Check } from "lucide-react"

export default function Coupon ({ coupon } : {
  coupon: CouponProps
}) {
  const [justClicked, setJustClicked] = useState(false);
  const handleClickTimeout = () => {
    if (justClicked) return;
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 5000);
  }
  return (
    <div className="w-80 h-40 rounded-sm shadow-md overflow-hidden flex flex-col">
      <div className="w-full pt-5 px-4 flex flex-1 items-start">
        <Image src={hotel} alt="" className="size-12 mr-3" />
        <div className="mr-1 flex-1">
          <h4 className="line-clamp-2 text-sm font-bold">
            {coupon.title}
          </h4>
          <p className="line-clamp-2 text-xs">
            {coupon.description}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Info className="size-4" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle asChild>
                <h4 className="line-clamp-2 text-sm font-bold">
            {coupon.title}
                </h4>
              </DialogTitle>
            </DialogHeader>
            <p className="line-clamp-2 text-xs">
            {coupon.description}
            </p>
            <DialogFooter>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative h-5 overflow-hidden">
        <hr className="absolute top-1/2 -translate-y-1/2 w-full border-dashed border border-gray-300" />
        <span className="absolute -translate-x-1/2 size-5 rounded-full inline-block bg-gray-300" />
        <span className="absolute right-0 translate-x-1/2 size-5 rounded-full inline-block bg-gray-300" />
      </div>

      <div className="w-full h-14 pt-2 pb-4 px-4 flex items-center">
        <div className="h-8 uppercase flex-1 mr-3 py-1 px-2 rounded-sm bg-gray-100 font-bold text-sm"> {coupon.code} </div>
        <button
          // value={coupon.code} // do I need this?
          onClick={async (event) => {
            const copyButton = event.currentTarget as HTMLElement;
            const couponText = copyButton.previousElementSibling?.textContent.trim();
            try {
              if (!couponText) {
                throw new Error("Something went wrong with the coupon component. Expected the coupon text to be the previous element sibling of this copying button.")
              }
              await navigator.clipboard.writeText(couponText);
              toast.success("Copied to clipboard!", { position: "top-right" })
            } catch (error) {
              console.error("error: ", error)
              toast.error("Failed to copy!", { position: "top-right" })
            }
            handleClickTimeout();
          }}
          data-justclicked={justClicked ? "true" : "false"}
          className="w-20 h-8 inline-flex items-center justify-center text-xs font-semibold text-primary bg-secondary rounded-full px-3 data-[justclicked=true]:bg-primary data-[justclicked=true]:text-secondary transition-all duration-300"
        >
          {justClicked ? 
            <>
              <Check className="size-4 mr-1" aria-hidden />
              Copied
            </>
            :
            <>
              <Copy className="size-4 mr-1" aria-hidden />
              Copy
            </>
          }
        </button>
      </div>
    </div>
  )
}