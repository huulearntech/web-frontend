"use server";
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { paths } from '@/constants/paths'
import { tvlk_logo_text_dark } from "@/public/logos"
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';

import HeaderAvatar from './header-avatar';


export default async function Header({ className }: { className?: string }) {
  const session = await auth();

  return (
    <header className={cn("w-full flex items-center bg-white shadow-md sticky top-0 z-60 h-20", className)}>
      <div className="flex justify-between items-center content">
        <Link href='/'>
          <Image src={tvlk_logo_text_dark} alt="Traveloka Header Logo" />
        </Link>
        <div className="flex items-center gap-16">
          {session?.user ? (
            <>
              <Link href={paths.favorites}>
                <HeartIcon className="size-6" strokeWidth={2} />
              </Link>
              <HeaderAvatar />
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