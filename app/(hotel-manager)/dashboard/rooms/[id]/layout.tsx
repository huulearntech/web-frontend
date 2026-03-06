import type { Metadata } from "next";
import prisma from "@/lib/prisma";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: roomId } = await params;
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    // select: { name: true }, // TODO: name because the owner need to see each room,
    // and type is useful but only for user.
    select: { type: true },
  });
  return {
    title: room ? `${room.type} — Room` : "Room",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}