import Link from 'next/link';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { paths } from '@/constants/paths'
import { tvlk_logo_text_dark } from "@/public/logos"
import { HeartIcon, CircleUserRoundIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Header({ className }: { className?: string }) {
  const user = {};

  return (
    <header className={cn("w-full flex items-center bg-white shadow-md sticky top-0 z-10 h-20", className)}>
      <div className="flex justify-between items-center content">
        <Link href='/'>
          <Image src={tvlk_logo_text_dark} alt="Traveloka Header Logo" />
        </Link>

        <div className="flex items-center gap-16">
          {user ? (
            <>
              <Link href={paths.favorites}>
                <HeartIcon className="size-6" strokeWidth={2}/>
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="hover:cursor-pointer">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback> <CircleUserRoundIcon className="size-6" strokeWidth={2}/> </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem> Profile </DropdownMenuItem>
                  <DropdownMenuItem> Settings </DropdownMenuItem>
                  <DropdownMenuItem> Log out </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={paths.partnershipRegister}>
                Trở thành đối tác của chúng tôi
              </Link>
              <Button asChild>
                <Link href={paths.signIn}> Đăng nhập </Link>
              </Button>
              <Button asChild>
                <Link href={paths.signUp}> Đăng ký </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};