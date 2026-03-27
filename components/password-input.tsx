"use client";

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { cn } from "@/lib/utils"

export default function PasswordInput({
  className,
  ref,
  ...props
}: React.ComponentProps<"input">
) {
  const [visible, setVisible] = useState(false)

  return (
    <InputGroup className={cn("w-auto", className)}>
      <InputGroupInput
        ref={ref}
        type={visible ? "text" : "password"}
        className="text-sm md:text-base"
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          variant="ghost"
          data-slot="input-group-button"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOffIcon className="pointer-events-none" />
          ) : (
            <EyeIcon className="pointer-events-none" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}