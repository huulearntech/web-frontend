import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

export async function POST(request: NextRequest) {
  const { email, password, name, action } = await request.json();

  if (action !== "signUp") {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  // TODO: Move schema to a separate file
  const parsedUser = z.object({
    email: z.email(),
    password: z.string().min(6).max(30),
    name: z.string().min(1),
  }).safeParse({ email, password, name });

  if (!parsedUser.success) {
    return NextResponse.json({ message: "Invalid input", errors: parsedUser.error }, { status: 400 });
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        ...parsedUser.data,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }
    console.error("Error creating user:", parsedUser.data, error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
  return NextResponse.json({ message: "User signed up successfully" }, { status: 200 });
}