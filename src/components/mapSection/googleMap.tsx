'use client';

import { MapMarker } from '@/lib/definitions';
import { RoutesApi } from '@/lib/utils/routesAPI';
import {
  APILoadingStatus,
  APIProvider,
  Map,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import Image from 'next/image';
import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import InfoWindowMarker from './infoWindowMarker';
import Route from './route';

const apiClient = new RoutesApi(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

const appearance = {
  walkingPolylineColor: '#000',
  defaultPolylineColor: '#251818',
  stepMarkerFillColor: '#333333',
  stepMarkerBorderColor: '#000000',
};

function MapContent() {
  const status = useApiLoadingStatus();

  const center = {
    lat: 49.535511901645684,
    lng: 20.675765124595053,
  };

  const markers: MapMarker[] = [
    {
      name: 'Kościół św. Wawrzyńca w Nowym Sączu',
      address: { street: 'Biegonicka 8', city: '33-300 Nowy Sącz' },
      link: 'https://maps.google.com/maps?ll=49.580301,20.668944&z=18&t=m&hl=en&gl=US&mapclient=apiv3&cid=8241979195982614352',
      position: {
        lat: 49.58017061259105,
        lng: 20.66924750997955,
      },
      icon: (
        <Image
          height={48}
          width={48}
          src="/church-icon.svg"
          alt="Ikona kościół"
        />
      ),
    },
    {
      name: 'Willa Poprad',
      address: { street: 'Rytro 306', city: '33-343 Rytro' },
      link: 'https://maps.google.com/maps?ll=49.514622,20.672423&z=13&t=m&hl=en&gl=US&mapclient=apiv3&cid=4988801318780363707',
      position: {
        lat: 49.49085319070032,
        lng: 20.682282739210553,
      },
      icon: (
        <Image
          height={48}
          width={48}
          src="/plate-icon.svg"
          alt="Ikona restauracja"
        />
      ),
    },
  ];

  return (
    <div className="h-[550px] w-[50%] flex-1 basis-80">
      {status !== APILoadingStatus.LOADED ? (
        <div className="relative flex h-full w-full animate-pulse items-center justify-center overflow-hidden bg-foreground/10">
          <AiOutlineLoading className="h-6 w-6 animate-spin text-foreground" />
        </div>
      ) : (
        <Map
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling={'cooperative'}
          disableDefaultUI={true}
          mapId={process.env.NEXT_PUBLIC_MAP_STYLE_ID!}
        >
          <Route
            apiClient={apiClient}
            origin={markers[0].position}
            destination={markers[1].position}
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
