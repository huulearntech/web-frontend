import { auth } from "@/auth";

// When user clicks on a hotel card (which is a link), they are taken to the hotel details page
// and somehow add to the watched list. The watched list is stored in the database and can be viewed
export default async function AccountPage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return (
    <main className="flex-1">
      Recently Watched Page - to be implemented
    </main>
  );
}