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
      name: 'Kościół św. Józefa w Kalwarii Zebrzydowskiej',
      address: { street: 'Rynek 26', city: '34-130 Kalwaria Zebrzydowska' },
      link: 'https://maps.app.goo.gl/UiAhesCcYSyY81RS9',
      position: {
        lat: 49.8666483437924,
        lng: 19.676112679605957,
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
      name: 'Villa Love',
      address: { street: 'Lwowska 78', city: '34-144 Izdebnik' },
      link: 'https://maps.app.goo.gl/2a5wVky55ADmTMP49',
      position: {
        lat: 49.85886156349809,
        lng: 19.766285431005784,
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
