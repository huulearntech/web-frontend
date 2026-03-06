'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, ListChecksIcon, HistoryIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/constants";

const navItems = [
  { name: "Profile", href: PATHS.account, icon: UserIcon },
  { name: "History", href: PATHS.accountHistory, icon: ListChecksIcon },
  { name: "Watched Recently", href: PATHS.accountRecentlyViewed, icon: HistoryIcon },
];

export default function AccountNavbar() {
  const pathname = usePathname();
  return (
    <nav className="w-64 p-4 border-r h-full">
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn("flex items-center gap-2 p-2 hover:bg-accent rounded",
                pathname === item.href ? "bg-secondary font-semibold" : "font-normal"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}