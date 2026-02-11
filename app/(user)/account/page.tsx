import { auth } from "@/auth";
import { Avatar as AvatarPrimitive } from "radix-ui"
import { CameraIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AccountPage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return (
    <main className="flex-1">
      <div className="mx-auto flex flex-col items-center gap-y-4 mt-13 px-4 py-3">
        {/** Shadcn avatar sucks */}
        <AvatarPrimitive.Root
          data-slot ="avatar"
          className= "relative flex size-25 shrink-0 rounded-full select-none"
        >
          <AvatarPrimitive.Image
            data-slot="avatar-image"
            src={session.user.image || undefined} alt={session.user.name || "User Avatar"}
            className="aspect-square size-full"
          />
          <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm"
          >
            {session.user.name ? session.user.name.toUpperCase() : "U"}
          </AvatarPrimitive.Fallback>
          <AvatarBadge
            data-slot="avatar-badge"
            // fix right-0 bottom-0 issue
            className="size-6 //bg-primary-foreground bg-accent text-primary ring-background absolute right-1 bottom-1 z-10 inline-flex items-center justify-center rounded-full ring-2 select-none"
          >
            <CameraIcon className="size-4"/>
          </AvatarBadge>
        </AvatarPrimitive.Root>
        {/* <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-3xl font-medium">{session.user.name}</h1>
          <p className="font-medium">{session.user.email}</p>
        </div> */}
      </div>
      <div className="flex flex-col items-center gap-y-4 mt-13 px-4 py-3 max-w-xl mx-auto">
        <div className="flex items-center justify-between w-full rounded-full py-4 px-6 bg-blue-50">
          <div className="font-semibold">Email</div>
          <div className="font-medium">{session.user.email}</div>
        </div>
        <div className="flex items-center justify-between w-full rounded-full py-4 px-6 bg-blue-50">
          <div className="font-semibold">Full name</div>
          <div className="font-medium">{session.user.name}</div>
        </div>
        <div className="flex items-center justify-between w-full rounded-full py-4 px-6 bg-blue-50">
          <div className="font-semibold">Language</div>
          <div className="font-medium">English</div> {/* Placeholder value */}
        </div>
        <div className="flex items-center justify-between w-full rounded-full py-4 px-6 bg-blue-50">
          <div className="font-semibold">Currency</div>
          <div className="font-medium">VND</div>
        </div>
      </div>
    </main>
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