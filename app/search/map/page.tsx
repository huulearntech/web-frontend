"use client";

import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";

export default function MapPage() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-100 h-100">
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // San Francisco
          style={{ width: "100%", height: "100%" }}
          onCameraChanged={ (ev: MapCameraChangedEvent) => {
            console.log("Camera changed:", ev.detail.center, ev.detail.zoom);
          }}
        />
      </div>
    </APIProvider>
  );
}