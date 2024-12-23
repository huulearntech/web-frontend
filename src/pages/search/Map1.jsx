import React, { useEffect } from 'react';
import { notification } from 'antd';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css'; // Import the CSS file

// Custom divIcon for the markers
const createCustomIcon = (price) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-dot">
            <div class="marker-content">
              <div class="marker-price">${price}</div>
              <div class="marker-triangle"></div>
            </div>
           </div>`,
    iconSize: [0, 0],
  });
};

const hotelLocations = [
  { position: [51.505, -0.09], price: '$1000000' },
  { position: [51.515, -0.1], price: '$120' },
  { position: [51.525, -0.11], price: '$80' }
];

const MapComponent = () => {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      console.log('Current map bounds:', bounds);
    };

    map.on('moveend', handleMoveEnd);

    // Cleanup the event listener on component unmount
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);

  return null;
};

const Map = () => {
  const handleMarkerClick = (hotel) => {
    notification.info({
      message: 'Hotel price',
      description: `Hotel price: ${hotel.price}` + `Hotel position: ${hotel.position}`,
      showProgress: true,
      pauseOnHover: false,
    });
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <MapComponent />
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      {hotelLocations.map((hotel, index) => (
        <Marker
          key={index}
          position={hotel.position}
          icon={createCustomIcon(hotel.price)}
          eventHandlers={{
            click: () => handleMarkerClick(hotel),
          }}
        >
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;