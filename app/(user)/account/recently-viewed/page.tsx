import HotelCard from "@/components/hotel-card";
import { user_getRecentlyViewedHotels } from "@/lib/actions/user-account/recently-viewed";

export default async function AccountRecentlyViewedPage() {
  const hotelsRecentlyViewedByUser = await user_getRecentlyViewedHotels();

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Khách sạn đã xem gần đây</h1>

        {hotelsRecentlyViewedByUser.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
            <p className="text-lg text-gray-600">Hiện chưa có khách sạn nào trong lịch sử xem của bạn.</p>
            <p className="mt-2 text-sm text-gray-500">Hãy tìm kiếm và xem các khách sạn; những mục bạn xem sẽ được lưu và hiển thị tại đây.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { // TODO: href
              hotelsRecentlyViewedByUser.map(hotel => <HotelCard key={hotel.id} hotel={hotel} href="#" />)
            }
          </div>
        )}
      </div>
    </main>
  );
}