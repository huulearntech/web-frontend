"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

export default function NavUserDropdownMenuContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const isMobile = useIsMobile();
  return (
    <DropdownMenuContent {...props} side={isMobile ? "top" : "right"} />
  )
}