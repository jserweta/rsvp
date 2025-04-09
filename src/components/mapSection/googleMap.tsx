'use client';

import { RoutesApi } from '@/lib/utils/routesAPI';
import {
  APILoadingStatus,
  APIProvider,
  Map,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import React from 'react';
import { BiSolidChurch } from 'react-icons/bi';
import Route from './route';
import { LiaUtensilsSolid } from 'react-icons/lia';
import { AiOutlineLoading } from 'react-icons/ai';
import InfoWindowMarker from './infoWindowMarker';

const apiClient = new RoutesApi(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

const appearance = {
  walkingPolylineColor: '#000',
  defaultPolylineColor: '#251818',
  stepMarkerFillColor: '#333333',
  stepMarkerBorderColor: '#000000',
};

const routeOptions = {
  travelMode: 'DRIVE',
  computeAlternativeRoutes: false,
  units: 'METRIC',
};

function MapContent() {
  const status = useApiLoadingStatus();

  const center = {
    lat: 49.535511901645684,
    lng: 20.675765124595053,
  };

  const markers = [
    {
      name: 'Church',
      position: {
        lat: 49.58017061259105,
        lng: 20.66924750997955,
      },
      icon: <BiSolidChurch size="48px" className="text-background" />,
    },
    {
      name: 'Restaurant',
      position: {
        lat: 49.49085319070032,
        lng: 20.682282739210553,
      },
      icon: <LiaUtensilsSolid size="48px" className="text-background" />,
    },
  ];

  return (
    <div className="h-[550px] w-[50%] flex-1">
      {status !== APILoadingStatus.LOADED ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-foreground/10">
          <AiOutlineLoading className="h-6 w-6 animate-spin text-foreground" />
        </div>
      ) : (
        <Map
          defaultCenter={center}
          defaultZoom={12}
          defaultTilt={180}
          gestureHandling={'cooperative'}
          disableDefaultUI={true}
          mapId={process.env.NEXT_PUBLIC_MAP_STYLE_ID!}
        >
          <Route
            apiClient={apiClient}
            origin={markers[0].position}
            destination={markers[1].position}
            routeOptions={routeOptions}
            appearance={appearance}
          />
          {markers &&
            markers.map((marker) => (
              <InfoWindowMarker key={marker.name} markerInfo={marker} />
            ))}
        </Map>
      )}
    </div>
  );
}

export default function GoogleMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <MapContent />
    </APIProvider>
  );
}
