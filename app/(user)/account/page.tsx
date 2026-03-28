// TODO: limiting the number of change name/image attempts within a certain time frame could be a good anti-abuse measure, but for now we'll keep it simple.

import type { Metadata } from "next";
import Link from "next/link";

import { PATHS } from "@/lib/constants";
import { user_getInfoById } from "@/lib/actions/user-account";
import { auth } from "@/auth";

import ChangeNameDialog from "./dialog-change-name";
import ChangeImageDialog from "./dialog-change-image";
import { ChevronRightIcon } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  const user = await user_getInfoById(session?.user.id ?? null);
  if (!user) { return null; } // NOTE: redirecting is already handled by proxy.

  return (
    <main>
      <div className="mx-auto flex flex-col items-center gap-y-4 mt-13 px-4 py-3">
        <ChangeImageDialog name={user.name ?? ""} profileImageUrl={user.profileImageUrl ?? undefined} />
      </div>

      <ul className="grid w-full max-w-xl gap-3 mx-auto mt-8 px-4">
        <li>
          <div
            className="flex items-center justify-between w-full rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/5"
            role="group"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Email</span>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </li>

        <ChangeNameDialog originalName={user.name ?? ""} />

        <li>
          <Link
            href={PATHS.accountHistory}
            className="group flex items-center justify-between w-full rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/5"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Booking History</span>
              <span className="text-sm text-muted-foreground">View your past bookings</span>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </li>

        <li>
          <Link
            href={PATHS.accountRecentlyViewed}
            className="group flex items-center justify-between w-full rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/5"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Watched Recently</span>
              <span className="text-sm text-muted-foreground">Quick access to recently viewed items</span>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      </ul>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings and preferences.',
}