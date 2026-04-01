import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { PATHS } from '@/lib/constants'
import { tvlk_logo_text_dark } from "@/public/logos"
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { user_getInfoById } from "@/lib/actions/user-account";

import HeaderAvatar from './header-avatar';
import { auth } from '@/auth';


export default async function Header({ className }: { className?: string }) {
  const session = await auth();
  const user = session ? await user_getInfoById(session.user.id) : null;

  return (
    <header className={cn("w-full flex items-center bg-white shadow-md z-10 h-20", className)}>
      <div className="flex justify-between items-center content">
        <Link href={PATHS.home}>
          <Image
            src={tvlk_logo_text_dark}
            alt="Traveloka Header Logo"
            className="h-10 object-contain"
          />
        </Link>
        {user ? (
          <div className="flex items-center gap-x-8">
            <Link href={PATHS.favorites}>
              <HeartIcon className="size-6" strokeWidth={2} />
            </Link>
            <HeaderAvatar {...user} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="link" className="hidden md:block">
              <Link href={PATHS.signUpHotel}>
                Đăng ký cơ sở lưu trú của bạn
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={PATHS.signIn}> Đăng nhập </Link>
            </Button>
            <Button asChild>
              <Link href={PATHS.signUp}> Đăng ký </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};