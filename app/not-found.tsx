import Link from "next/link";
import Image from "next/image";
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { ArrowLeft } from "lucide-react";
import { tvlk_logo_text_dark } from "@/public/logos";

export default function NotFound () {
  return (
    <main className="flex h-screen items-center justify-center bg-accent">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-8 gap-8 w-full max-w-md md:max-w-3xl">
        <div className="w-full">
          <Image
            src={tvlk_logo_text_dark}
            alt="Logo"
            className="w-64 mx-auto my-auto"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <FaceFrownIcon className="w-10 text-gray-400" />
          <h2 className="text-xl font-semibold">404 Not Found</h2>
          <p>Could not find the requested resource.</p>
          <Link
            href="/"
            className="flex items-center mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          >
            <ArrowLeft className="mr-2"/>
            Go Back
          </Link>
        </div>
      </div>
    </main>
  );
}