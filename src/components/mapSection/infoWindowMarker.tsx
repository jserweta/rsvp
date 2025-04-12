import { MapMarker } from '@/lib/definitions';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import { Button } from '../ui/button';

export default function InfoWindowMarker({
  markerInfo,
}: {
  markerInfo: MapMarker;
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={markerInfo.position}
        clickable
        onClick={() => setIsInfoOpen(true)}
        title={markerInfo.name}
      >
        {markerInfo.icon}
      </AdvancedMarker>

      {isInfoOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={215}
          onCloseClick={() => setIsInfoOpen(false)}
          headerContent={
            <span className="me-5 max-w-[150px] font-[600]">
              {markerInfo.name}
            </span>
          }
        >
          <div className="mt-2 flex flex-col">
            <p>{markerInfo.address.street}</p>
            <p>{markerInfo.address.city}</p>
          </div>

          <Button asChild variant="secondary" className="mt-4">
            <a href={markerInfo.link} target="_blank">
              Jak dojechać?
            </a>
          </Button>
        </InfoWindow>
      )}
    </>
  );
}
