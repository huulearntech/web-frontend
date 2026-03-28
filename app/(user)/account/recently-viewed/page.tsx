import HotelCard from "@/components/hotel-card";
import { fetchHotelsRecentlyViewedByUser } from "@/lib/actions/user-account/recently-viewed";

// TODO: Replace hotelcard with hotelcard copy
export default async function AccountRecentlyViewedPage() {
  const hotelsRecentlyViewedByUser = await fetchHotelsRecentlyViewedByUser();

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Recently viewed</h1>

        {hotelsRecentlyViewedByUser.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
            <p className="text-lg text-gray-600">You haven't viewed any hotels yet.</p>
            <p className="mt-2 text-sm text-gray-500">Browse hotels and they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { // TODO: href
            hotelsRecentlyViewedByUser.map(hotel => <HotelCard key={hotel.id} hotel={hotel} href="#"/>)}
          </div>
        )}
      </div>
    </main>
  );
}