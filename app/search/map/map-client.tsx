// TODO: Close popup when drag away. Currently the popup will stay open until you click somewhere on the map, which is not ideal.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-override.css"; // for custom popup styling
import { Loader2Icon } from "lucide-react";

import MyMarker from "./my-marker";

import { type SearchHotelsByBBoxResult, type BBox, searchHotelsByBBox } from "../../../lib/actions/search/map";

import useSWR from "swr";

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [map, center]);
  return null;
}

function MapListeners({ onBoundsChange }: { onBoundsChange: (bounds: BBox) => void; }) {
  useMapEvents({
    moveend(e) {
      const m = e.target;
      const b = m.getBounds();
      onBoundsChange({
        south: b.getSouth(),
        west: b.getWest(),
        north: b.getNorth(),
        east: b.getEast()
      });
    },
  });
  return null;
}

// NOTE: This is a bit of a hack to get the initial bounds on first load, since useMapEvents doesn't trigger on mount and we need the bounds to fetch data.
function InitializeBounds({ onInit }: { onInit: (bounds: BBox) => void }) {
  const map = useMap();
  useEffect(() => {
    const b = map.getBounds();
    onInit({
      south: b.getSouth(),
      west: b.getWest(),
      north: b.getNorth(),
      east: b.getEast(),
    });
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
}

export default function MapClient() {
  const [bbox, setBbox] = useState<BBox | null>(null);

  const [defaultCenter, setDefaultCenter] = useState<[number, number]>([21.0278, 105.8342]); // Hanoi center as default
  const [userLocated, setUserLocated] = useState(false);

  // SWR key is null when there's no bbox yet, preventing fetch
  const swrKey = bbox ? ['hotels-by-bbox', bbox.south, bbox.west, bbox.north, bbox.east] : null;

  const { data: hotels, isValidating } = useSWR<SearchHotelsByBBoxResult[]>(
    swrKey,
    async () => {
      // bbox is guaranteed non-null when key is non-null
      // simulate network and server latency for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await searchHotelsByBBox(bbox as BBox);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // dedupe multiple rapid moves into a single request within this window
      dedupingInterval: 2000,
      keepPreviousData: true,
    }
  );

  // FIXME: Fix this temporary patch to prevent infinite rerender
  const prevBboxRef = useRef<BBox | null>(null);
  // const mapRef = useRef<Map>(null);

  const handleBoundsChange = useCallback((newBbox: BBox) => {
    if (prevBboxRef.current) {
      const prev = prevBboxRef.current;
      const distanceMoved = Math.sqrt(
        Math.pow(newBbox.north - prev.north, 2) +
        Math.pow(newBbox.east - prev.east, 2)
      );
      // Only update if moved more than ~1km (in lat/lng degrees)
      // TODO: if use this approach, consider using Haversine formula.
      if (distanceMoved < 0.01) {
        return;
      }
    }
    setBbox(newBbox);
    prevBboxRef.current = newBbox;
  }, []);

  return (
    <div className="w-full flex-1">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Initialize bbox on first mount so we have data on first load */}
        {!bbox && (
          <InitializeBounds
            onInit={(b) => {
              setBbox(b);
              prevBboxRef.current = b;
            }}
          />
        )}

        <MapListeners onBoundsChange={handleBoundsChange} />
        {userLocated && <RecenterMap center={defaultCenter} />}

        {isValidating && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-1000
               flex items-center gap-x-2 px-3 py-1 rounded-full
               bg-white shadow text-base font-semibold
               pointer-events-none
               ">
            <Loader2Icon className="animate-spin size-5" />
            Loading hotels
          </div>
        )}

        {hotels?.map((hotel) => <MyMarker key={hotel.id} hotel={hotel} />)}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
}