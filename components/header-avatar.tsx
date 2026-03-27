"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { signOut } from "next-auth/react";
import { PATHS } from "@/lib/constants";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default function HeaderAvatar({
  userName,
  userEmail,
  userImageSrc
}: {
  userName: string;
  userEmail: string;
  userImageSrc: string;
}) {

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userImageSrc} alt={userName} />
            <AvatarFallback>{userName.toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-50">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-1">
              <p className="font-semibold"> Xin chào, {userName} </p>
              <p className="font-normal text-muted-foreground">{userEmail}</p>
              <Avatar className="size-16 mt-2 mx-auto">
                <AvatarImage src={userImageSrc} alt={userName} />
                <AvatarFallback>{userName.toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuLabel>
          <DropdownMenuItem
            asChild
            className="flex gap-x-2"
          >
            <Link href={PATHS.account} className="items-start">
              Tài khoản của tôi
              <ChevronRightIcon className="ml-auto size-4" />
            </Link>
          </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

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
              onClick={() => signOut({ redirectTo: PATHS.home })}>
              Đăng xuất
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}