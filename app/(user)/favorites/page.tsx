import HotelCard from "@/components/hotel-card";
import { user_fetchFavoriteHotels } from "@/lib/actions/user-account/favorites";

export default async function FavoritesPage() {
  const favoriteHotels = await user_fetchFavoriteHotels();

  return (
    <main className="content">
      <h1 className="text-2xl font-bold mb-4">Khách sạn yêu thích</h1>
      {favoriteHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              href={"#"} // TODO: link to hotel detail page
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">Bạn chưa thêm khách sạn nào vào danh sách yêu thích.</p>
          <p className="text-sm">Hãy bắt đầu khám phá và thêm những khách sạn mà bạn quan tâm vào danh sách yêu thích!</p>
        </div>
      )}
    </main>
  );
}