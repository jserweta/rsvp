import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import React, { useState } from 'react';

export default function InfoWindowMarker({
  markerInfo,
}: {
  markerInfo: {
    name: string;
    position: { lat: number; lng: number };
    icon: React.JSX.Element;
  };
}) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={markerInfo.position}
        clickable
        onClick={() => setInfowindowOpen(true)}
      >
        {markerInfo.icon}
      </AdvancedMarker>

      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {markerInfo.name}
        </InfoWindow>
      )}
    </>
  );
}
