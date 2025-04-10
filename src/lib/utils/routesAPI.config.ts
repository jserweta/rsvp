export const defaultAppearance = {
  walkingPolylineColor: '#000000',
  defaultPolylineColor: '#9a1e45',
  stepMarkerFillColor: '#333333',
  stepMarkerBorderColor: '#000000',
};

export const defaultRouteOptions = {
  travelMode: 'DRIVE',
  computeAlternativeRoutes: false,
  units: 'METRIC',
};

export type RouteOptions = typeof defaultRouteOptions;

export type Appearance = typeof defaultAppearance;
