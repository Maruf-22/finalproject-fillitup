export interface Location {
  place: google.maps.places.PlaceResult;
  prices: {
    unleaded: number;
    superUnleaded: number;
    diesel: number;
  };
  marker: any;
}
