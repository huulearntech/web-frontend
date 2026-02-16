import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar";
import Navbar from "./navbar";

import type { Metadata } from "next";

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

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const hotelId = params.id;

//   const hotel = await fetch(`http://localhost:8080/api/hotels/${hotelId}`).then(res => res.json());
  
//   return {
//     title: hotel.name,
//     description: hotel.description,
//     openGraph: {
//       title: hotel.name,
//       description: hotel.description,
//       images: [
//         {
//           url: hotel.imageUrl,
//           alt: hotel.name,
//         },
//       ],
//     },
//   };
// }