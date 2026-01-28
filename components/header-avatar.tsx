"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useSession, signOut } from "next-auth/react";
import { paths } from "@/constants/paths";

export default function HeaderAvatar() {
  // FIXME: useSession get called every time when component re-rendered, even when user switch tabs
  const { data: session } = useSession();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={undefined /** undefined for now */} alt={session?.user?.name || "User Avatar"} />
            <AvatarFallback>{session?.user?.name ? session.user.name.toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem> Profile </DropdownMenuItem>
          <DropdownMenuItem> Settings </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                Đăng xuất
              </DropdownMenuItem>
            </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Đăng xuất
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn đăng xuất không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline"> Hủy </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => signOut({ redirectTo: paths.home })}>
              Đăng xuất
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}