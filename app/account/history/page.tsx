import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return (
    <main className="flex-1">
      History Page - to be implemented
    </main>
  );
}