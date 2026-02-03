import { auth } from "@/auth";
import { paths } from "@/constants/paths";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AccountPage() {
  const session = await auth();

  // should handle in proxy layer
  if (!session || !session.user) {
    redirect(paths.signIn);
  }

  return (
    <main className="flex-1">
      <div className="mx-auto flex flex-col items-center gap-y-4 mt-13 px-4 py-3">
        <Avatar className="size-24">
          <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User Avatar"} />
          <AvatarFallback>{session.user.name ? session.user.name.toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-3xl font-medium">{session.user.name}</h1>
          <p className="font-medium">{session.user.email}</p>
        </div>
      </div>
    </main>
  );
}