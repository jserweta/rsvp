import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

type PolylineCustomProps = {
  encodedPath?: string;
};

export type PolylineProps = google.maps.PolylineOptions & PolylineCustomProps;

export const Polyline = (props: PolylineProps) => {
  const { encodedPath, ...polylineOptions } = props;

  const map = useMap();
  const geometryLibrary = useMapsLibrary('geometry');
  const mapsLibrary = useMapsLibrary('maps');

  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  // create poyline once available
  useEffect(() => {
    if (!mapsLibrary) return;

    setPolyline(new mapsLibrary.Polyline());
  }, [mapsLibrary]);

  // update options when changed
  useEffect(() => {
    if (!polyline) return;

    polyline.setOptions(polylineOptions);
  }, [polyline, polylineOptions]);

  // decode and update polyline with encodedPath
  useEffect(() => {
    if (!encodedPath || !geometryLibrary || !polyline) return;

    polyline.setPath(geometryLibrary.encoding.decodePath(encodedPath));
  }, [polyline, encodedPath, geometryLibrary]);

  // add polyline to map
  useEffect(() => {
    if (!map || !polyline) return;

    polyline.setMap(map);

    return () => polyline.setMap(null);
  }, [map, polyline]);

  return <></>;
};
