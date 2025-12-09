// Separate the user-related components to other file(s) and use Suspense for better UX
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


export default function Header () {
  const user = {};

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto justify-between items-center">
        <Link href='/'>
          <Image src={tvlk_logo_text_dark} alt="Traveloka Header Logo" />
        </Link>

        <div className="flex items-center gap-16">
          {user ? (
            <>
              <Link href={paths.favorites}>
                {/* <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
                    <HeartOutlined style={{ fontSize: '24px' }} />
                  </Badge> */}
                link content
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="hover:cursor-pointer">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback> avatar-fallback </AvatarFallback>
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