import { RoutesApi } from '@/lib/utils/routesAPI';
import {
  Appearance,
  defaultAppearance,
  defaultRouteOptions,
  RouteOptions,
} from '@/lib/utils/routesAPI.config';
import { useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useMemo, useState } from 'react';
import { Polyline } from './polyline';

export type RouteProps = {
  apiClient: RoutesApi;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  routeOptions?: Partial<RouteOptions>;
  appearance?: Partial<Appearance>;
};

const Route = (props: RouteProps) => {
  const { apiClient, origin, destination } = props;

  const routeOptions = useMemo(() => {
    return { ...defaultRouteOptions, ...props.routeOptions };
  }, [props.routeOptions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [route, setRoute] = useState<any>(null);

  const map = useMap();
  useEffect(() => {
    if (!map) return;

    apiClient.computeRoutes(origin, destination, routeOptions).then((res) => {
      // we're only interested in the first result for this case
      const [route] = res.routes;

      // store in state and trigger rerendering
      setRoute(route);

      // fit map to the viewport returned from the API
      const { high, low } = route.viewport;
      const bounds: google.maps.LatLngBoundsLiteral = {
        north: high.latitude,
        south: low.latitude,
        east: high.longitude,
        west: low.longitude,
      };

      map.fitBounds(bounds);
    });
  }, [origin, destination, routeOptions]);

  if (!route) return null;

  // With only two waypoints, our route will have a single leg.
  // We now want to create a visualization for the steps in that leg.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeSteps: any[] = route.legs[0].steps;

  const appearance = { ...defaultAppearance, ...props.appearance };

  // Every step of the route is visualized using a polyline (see ./polyline.tsx);
  // color and weight depend on the travel mode. For public transit lines
  // with established colors, the official color will be used.
  const polylines = routeSteps.map((step, index) => {
    const isWalking = step.travelMode === 'WALK';
    const color = isWalking
      ? appearance.walkingPolylineColor
      : (step?.transitDetails?.transitLine?.color ??
        appearance.defaultPolylineColor);

    return (
      <Polyline
        key={`${index}-polyline`}
        encodedPath={step.polyline.encodedPolyline}
        strokeWeight={isWalking ? 2 : 3}
        strokeColor={color}
      />
    );
  });

  return <>{polylines}</>;
};

export default React.memo(Route);
