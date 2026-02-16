import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { renderToString } from "react-dom/server";

type Hotel = { id: string; name: string; lat: number; lng: number; price?: number; imageUrl?: string };

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


export default function MyMarker({ hotel } : { hotel: Hotel }) {
  return (
    <Marker position={[hotel.lat, hotel.lng]} icon={createPriceIcon(hotel.price)}>
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
          <div>
            <div className="text-sm font-semibold">{hotel.name}</div>
            <div className="text-xs text-gray-600">{hotel.price}</div>
            <div className="mt-2">
              <Button asChild size="sm" variant="outline" className="w-full">
                <a
                  href={`/hotels/${hotel.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary! hover:underline"
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