'use client';
import React, { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    mapIds: ['8e65060db536d05a'],
  });

  const containerStyle = {
    width: '100%',
    height: '800px',
    marginBottom: '50px',
  };

  const center = {
    lat: 49.535511901645684,
    lng: 20.675765124595053,
  };

  const markers = useMemo(() => {
    if (!isLoaded || typeof window === 'undefined') return null;

    return [
      {
        name: 'Church',
        position: {
          lat: 49.58017061259105,
          lng: 20.66924750997955,
        },
        icon: {
          url: '/churchIcon.svg',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      },
      {
        name: 'Restaurant',
        position: {
          lat: 49.49085319070032,
          lng: 20.682282739210553,
        },
        icon: {
          url: '/restaurantIcon.svg',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      },
    ];
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{ mapId: '8e65060db536d05a', disableDefaultUI: true }}
    >
      {markers &&
        markers.map((marker) => (
          <Marker
            key={marker.name}
            position={marker.position}
            icon={marker.icon}
            label={{
              text: marker.name,
              color: 'red',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            clickable
          />
        ))}
    </GoogleMap>
  );
}
