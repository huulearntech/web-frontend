import React, { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../Map.css';

import MapProductCard from './MapProductCard';

const createCustomIcon = (price, isSelected, isVisited) => {
  const iconHtml = isSelected
    ? `
      <div class="marker-dot">
      </div>
    `
    : isVisited
      ? `
      <div class="marker-dot">
        <div class="marker-content">
          <div class="marker-price marker-visited">${price}</div>
          <div class="marker-triangle marker-visited"></div>
        </div>
      </div>
    `
      : `
      <div class="marker-dot">
        <div class="marker-content">
          <div class="marker-price">${price}</div>
          <div class="marker-triangle"></div>
        </div>
      </div>
    `;
  return L.divIcon({
    className: 'custom-div-icon',
    html: iconHtml,
    iconSize: [0, 0],
  });
};

const MyMarker = ({ hotel, isSelected, isVisited, onClick, onClose }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
      position={hotel.position}
      icon={createCustomIcon(hotel.price, isSelected, isVisited)}
      eventHandlers={{
        click: () => onClick(hotel.id),
      }}
      ref={markerRef}
    >
      { isSelected &&
        <Popup eventHandlers={{ remove: () => onClose() }} closeButton={false}>
            <MapProductCard product={hotel}/>
        </Popup>
      }
    </Marker>
  );
};

export default MyMarker;
