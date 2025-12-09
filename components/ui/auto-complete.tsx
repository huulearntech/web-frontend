"use client";

import * as React from "react";
import * as AutoCompletePrimitive from "@/components/custom-radixui/auto-complete";

import { cn } from "@/lib/utils";

function AutoComplete({
  ...props
}: React.ComponentProps<typeof AutoCompletePrimitive.Root>) {
  return <AutoCompletePrimitive.Root data-slot="auto-complete" {...props} />;
}

function AutoCompletePortal({
  ...props
}: React.ComponentProps<typeof AutoCompletePrimitive.Portal>) {
  return <AutoCompletePrimitive.Portal data-slot="auto-complete-portal" {...props} />;
}

function AutoCompleteTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AutoCompletePrimitive.Trigger>) {
  return (
    <AutoCompletePrimitive.Trigger
      data-slot="auto-complete-trigger"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function AutoCompleteContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof AutoCompletePrimitive.Content>) {
  return (
    <AutoCompletePrimitive.Portal>
      <AutoCompletePrimitive.Content
        data-slot="auto-complete-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 max-h-(--custom-radix-auto-complete-content-available-height) min-w-[8rem] origin-(--custom-radix-auto-complete-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </AutoCompletePrimitive.Portal>
  )
}

function AutoCompleteItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AutoCompletePrimitive.Item> & {
  inset?: boolean,
  variant?: "default" | "destructive",
}) {
  return (
    <AutoCompletePrimitive.Item
      data-slot="auto-complete-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none", // TODO: Why select-none?
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:text-destructive",
        "data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20",
        "data-[variant=destructive]:*:[svg]:!text-destructive",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export {
  AutoComplete,
  AutoCompletePortal,
  AutoCompleteTrigger,
  AutoCompleteContent,
  AutoCompleteItem
}