import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import MyMarker from './MyMarker'; // Assuming you have a MyMarker component

const Map = ({ center, zoom = 13, results, fetchHotelsWithinBounds }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visitedMarkers, setVisitedMarkers] = useState(new Set());
  const [mapBounds, setMapBounds] = useState(null);
  

  useEffect(() => {
    if (mapBounds) {
      fetchHotelsWithinBounds(mapBounds);
    }
    console.log('Map bounds:', mapBounds);
  }, [mapBounds, fetchHotelsWithinBounds]);

  const handleMarkerClick = (markerId) => {
    setSelectedMarker((prevSelectedMarker) => {
      if (prevSelectedMarker && prevSelectedMarker !== markerId) {
        setVisitedMarkers((prev) => new Set(prev).add(prevSelectedMarker));
      }
      return markerId;
    });
  };

  const handlePopupClose = () => {
    setSelectedMarker((prevSelectedMarker) => {
      if (prevSelectedMarker) {
        setVisitedMarkers((prev) => new Set(prev).add(prevSelectedMarker));
      }
      return null;
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
    >
      <MapEvents setMapBounds={setMapBounds} />
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      {results.map((hotel) => {
        const isSelected = selectedMarker === hotel.id;
        const isVisited = visitedMarkers.has(hotel.id);
        return (
          <MyMarker
            key={hotel.id}
            hotel={hotel}
            isSelected={isSelected}
            isVisited={isVisited}
            onClick={handleMarkerClick}
            onClose={handlePopupClose}
          />
        );
      })}
    </MapContainer>
  );
};

const MapEvents = ({ setMapBounds }) => {
  useMapEvents({
    moveend: (event) => {
      const bounds = event.target.getBounds();
      setMapBounds(bounds);
    },
    zoomend: (event) => {
      const bounds = event.target.getBounds();
      setMapBounds(bounds);
    },
  });
  return null;
};

export default Map;