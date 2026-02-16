"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-override.css"; // for custom popup styling
import SearchBar from "@/components/search-bar";
import { defaultFilterContentValues, FilterSheet } from "../filter";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { useFilterSheetContext } from "../filter-sheet-context";
import { FilterFormProvider } from "../filter-form-context";

import MyMarker from "./my-marker";

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [map, center]);
  return null;
}


// Minimal Hotel shape for map display (price and imageUrl included)
type Hotel = { id: string; name: string; lat: number; lng: number; price?: number; imageUrl?: string };

function MapListeners({ onBoundsChange }: { onBoundsChange: (bounds: [number, number, number, number]) => void; }) {
  useMapEvents({
    moveend(e) {
      const m = e.target;
      const b = m.getBounds();
      onBoundsChange([b.getSouth(), b.getWest(), b.getNorth(), b.getEast()]);
    },
  });
  return null;
}

export default function MapClient() {
  // sample/demo hotels (replace with real fetch results when available)
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: "1", name: "Dragon's Nest Hotel", lat: 21.028511, lng: 105.804817, price: 123456, imageUrl: "/images/sample-hotel-1.jpg" },
    { id: "2", name: "Lakeview Inn", lat: 21.03, lng: 105.82, price: 98765, imageUrl: "/images/sample-hotel-2.jpg" },
  ]);
  const [loading, setLoading] = useState(false);
  const [defaultCenter, setDefaultCenter] = useState<[number, number]>([21.0278, 105.8342]); // Hanoi center as default

  useEffect(() => {
    // Ask for user's location permission and set default center to their location if granted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Geolocation permission denied or unavailable, using default center.", error);
        }
      );
    }
  }, []);

  async function fetchHotelsByBbox(bbox: [number, number, number, number]) {
    // Replace with your API call. For demo we just log and could fetch.
    console.log("fetch hotels in bbox", bbox);
    // Example: const res = await fetch(`/api/hotels?bbox=${bbox.join(",")}`);
    // const data = await res.json(); setHotels(data.hotels ?? []);
  }

  const { setOpen: setFilterSheetOpen } = useFilterSheetContext();

  return (
    <>
      <FilterFormProvider initialValues={defaultFilterContentValues}>
        <FilterSheet className="z-1000 mt-15 md:mt-[82px]" side="right" />
      </FilterFormProvider>

      <div className="w-screen h-screen flex flex-col">
        <div className="py-3 top-0 shadow-lg bg-white z-500 flex items-end justify-center gap-x-2">
          <Button
            onClick={() => {
              setFilterSheetOpen(true);
            }}
            variant="outline"
            className="size-9 flex items-center justify-center"
            aria-label="Open filter sheet"
          >
            <ListFilter className="size-4" />
          </Button>
          <SearchBar className="content mx-0 z-1000" />
        </div>

        <div className="w-full flex-1">
          <MapContainer center={ // TODO: get from search params or user location
              defaultCenter
            } zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            <MapListeners onBoundsChange={(bbox) => fetchHotelsByBbox(bbox)} />
            <RecenterMap center={defaultCenter} />

            {hotels.map((h) => <MyMarker key={h.id} hotel={h} />)}
          </MapContainer>
        </div>
      </div>
    </>
  );
}