import bcrypt from 'bcrypt';
import prisma from "@/lib/prisma"
import { schemaSignIn } from "@/lib/zod_schemas/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

/* These bullshit javashit frameworks change their API every fucking month
 * because the new one sounds cooler
 */
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        const parsedCredentials = await schemaSignIn.safeParseAsync(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid credentials");
          return null;
        }
        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: { email: email as string },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(
          password,
          user.password as string
        );
        if (!passwordMatch) return null;
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);