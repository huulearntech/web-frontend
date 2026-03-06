import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar copy";
import Navbar from "./navbar";

import type { Metadata } from "next";
import prisma from "@/lib/prisma";

export default function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="static border-b border-2"/>
      <div className="flex flex-col py-3 sticky top-0 shadow-lg bg-white z-20 gap-y-4">
        <SearchBar className="content" />
        <Navbar />
      </div>
      <main className="flex flex-col gap-y-4 content my-4">
        {children}
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: hotelId } = await params;
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });

  if (!hotel) {
    return {
      title: "Hotel not found",
    };
  }
  
  return {
    title: hotel.name,
    description: hotel.description ?? undefined,
    openGraph: {
      title: hotel.name,
      description: hotel.description ?? undefined,
      images: [
        {
          url: hotel.imageUrls[0],
          alt: hotel.name,
        },
      ],
    },
  };
}