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
  const user = await user_getInfoById(session?.user.id ?? null);

  return (
    <header className={cn("w-full flex items-center bg-white shadow-md z-10 h-20", className)}>
      <div className="flex justify-between items-center content">
        <Link href='/'>
          <Image
            src={tvlk_logo_text_dark}
            alt="Traveloka Header Logo"
            className="h-10 object-contain"
          />
        </Link>
        <div className="flex items-center gap-16">
          {user ? (
            <>
              <Link href={PATHS.favorites}>
                <HeartIcon className="size-6" strokeWidth={2} />
              </Link>
              <HeaderAvatar {...user} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={PATHS.signUpHotel}>
                Đăng ký cơ sở lưu trú của bạn
              </Link>
              <Button asChild>
                <Link href={PATHS.signIn}> Đăng nhập </Link>
              </Button>
              <Button asChild>
                <Link href={PATHS.signUp}> Đăng ký </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};