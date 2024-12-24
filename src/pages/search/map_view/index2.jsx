import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Map.css';
import MyMarker from './MyMarker';

import searchServices from '../../../services/searchServices';


const MapComponent = ({ setMapBounds }) => {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      setMapBounds(bounds);
    };

    map.on('moveend', handleMoveEnd);

    // Cleanup the event listener on component unmount
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, setMapBounds]);

  return null;
};

const Map = ({ center, zoom=13, results }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visitedMarkers, setVisitedMarkers] = useState(new Set());
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    console.log('Map bounds:', mapBounds);
  } , [mapBounds]);

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
      <MapComponent setMapBounds={setMapBounds} />
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

export default Map;