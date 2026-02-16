"use client";
import dynamic from "next/dynamic";
import FilterSheetProvider from "../filter-sheet-context";

const MapClient = dynamic(() => import("./map-client"), { ssr: false });

export default function MapPage() {
  return (
    <FilterSheetProvider>
      <MapClient />
    </FilterSheetProvider>
  );
}