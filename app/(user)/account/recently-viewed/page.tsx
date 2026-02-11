import { auth } from "@/auth";
import { HotelCard } from "@/components/hotel-card";

import { fake_hotels } from "@/old/mock_data";

export default async function AccountRecentlyViewedPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Recently viewed</h1>

        {fake_hotels.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
            <p className="text-lg text-gray-600">You haven't viewed any hotels yet.</p>
            <p className="mt-2 text-sm text-gray-500">Browse hotels and they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fake_hotels.map((hotel: any) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}