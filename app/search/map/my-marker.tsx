import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { renderToString } from "react-dom/server";

import { type SearchHotelsByBBoxResult } from "../../../lib/actions/search/map";

function createPriceIcon(price?: number) {
  const PriceIcon = () => {
    return (
      <div className="w-20 h-7.5 inline-flex items-center justify-center bg-white text-xs font-semibold text-primary border border-gray-accent rounded-full px-3 py-1 shadow-sm">
        {price}
      </div>
    );
  }
  return L.divIcon({
    html: renderToString(<PriceIcon />),
    className: "", // keep empty so custom markup styles apply
    iconSize: [80, 30], // icon size (width, height)
    iconAnchor: [40, 30], // point of the icon which will correspond to marker's location (center bottom)
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor (center top)
  });
}


export default function MyMarker({ hotel } : { hotel: SearchHotelsByBBoxResult }) {
  return (
    <Marker position={[hotel.latitude, hotel.longitude]} icon={createPriceIcon(hotel.price)}>
      <Popup
        closeButton={false}
      >
        <div className="w-64 p-2 flex flex-col gap-y-2">
          <div className="h-60 w-full overflow-hidden rounded-md bg-gray-100">
            {hotel.imageUrl ? (
              // use plain img inside popup to avoid Next.js image layout issues in leaflet popup
              <img src={hotel.imageUrl} alt={hotel.name} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No image</div>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="text-base font-bold">{hotel.name}</h3>
            <div className="inline-flex items-center gap-x-1 text-xs">
              <div className="font-black text-primary">{hotel.reviewPoints}/10</div>
              <div className="font-black text-primary">{"Rat tot"
                // TODO: calculate rating text based on review points, e.g. "Excellent", "Good", "Average", "Poor"
              }</div>
              <div className="font-medium text-gray-500">({hotel.numberOfReviews} danh gia)</div>
            </div>

            <div className="text-base font-bold text-orange-500">{hotel.price + " VND"
              //TODO: format price with currency and thousand separators, e.g. "1,234,567 VND"
            }</div>
            <div className="mt-2">
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 focus:ring-orange-300">
                <a
                  href={`/hotels/${hotel.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary-foreground! font-bold!"
                >
                  View
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}