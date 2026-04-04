// FIXME: There is a lot of ambiguity in naming.
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

export async function fetchRecentBookings() {
  const session = await auth();
  if (session?.user.role !== "USER") {
    // TODO: Handle
    return [];
  }

  return prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      hotel: {
        select: { name: true }
      }
    }
  }).then(bookings => bookings.map(booking => ({
    ...booking,
    totalPrice: booking.totalPrice.toNumber(),
  })));
}

export type RecentBookingType = Awaited<ReturnType<typeof fetchRecentBookings>>[number];

export type UpdateUserNameResult =
  | { success: true; user: { id: string; name: string | null } }
  | { success: false; error: string; code?: string };

export async function updateUserName(newName: string): Promise<UpdateUserNameResult> {
  const session = await auth();
  if (
    // session?.user.role !== "USER"
    !session?.user // temporary.
  ) {
    return { success: false, error: "Unauthorized", code: "UNAUTHORIZED" };
  }

  const nameSchema = z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(100, { message: "Name is too long" });

  const parsed = nameSchema.safeParse(newName);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message, code: "VALIDATION_ERROR" };
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: parsed.data },
      select: { id: true, name: true },
    });

    revalidateTag(CACHE_TAGS.userInfo, 'max');
    revalidatePath(PATHS.account);
    return { success: true, user };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { CACHE_TAGS, PATHS } from "@/lib/constants";

export const user_getInfoById = unstable_cache(
  async (userId: string | null) => {
    if (!userId) { return null; }

    return prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, profileImageUrl: true, email: true },
    });
  },
  [],
  { tags: [CACHE_TAGS.userInfo] }
);

export async function user_createOrUpdateAvatarUrl(avatarUrl: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return prisma.user.update({
    where: { id: session.user.id },
    data: { profileImageUrl: avatarUrl },
    select: { profileImageUrl: true },
  }).then(result => {
    revalidateTag(CACHE_TAGS.userInfo, 'max');
    revalidatePath(PATHS.account);
    return result;
  });
}