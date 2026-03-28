// TODO: May change the name to reflect the functionality,
// or make it a dialog (??)

// TODO: Implement uploading and updating profile image. This is just the UI part for now.

import { Avatar as AvatarPrimitive } from "radix-ui"
import { cn } from "@/lib/utils";

import { CameraIcon } from "lucide-react";


export default function ChangeImageDialog({
  name,
  profileImageUrl,
}: {
  name: string;
  profileImageUrl?: string | null;  
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className="group relative flex size-25 shrink-0 rounded-full select-none"
    >
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        src={profileImageUrl || undefined} alt={name || "Something went wrong"}
        className="aspect-square size-full"
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm"
      >
        {name}
      </AvatarPrimitive.Fallback>
      <input
        id="avatar-image-input"
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Choose profile image"
      />
      <label
        htmlFor="avatar-image-input"
        className="absolute right-1 bottom-1 z-10 inline-flex items-center justify-center rounded-full select-none"
      >
        <AvatarBadge
          data-slot="avatar-badge"
          role="button"
          aria-label="Change profile image"
          tabIndex={0}
          className="size-6 bg-accent text-primary ring-background inline-flex items-center justify-center rounded-full ring-2 group-hover:scale-150 transition-transform hover:cursor-pointer"
        >
          <CameraIcon className="size-4" />
        </AvatarBadge>
      </label>
    </AvatarPrimitive.Root>
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}