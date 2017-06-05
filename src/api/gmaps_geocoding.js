import { GMAPS_GEOCODING_API_KEY } from '../utils/gmaps_config';

export const geocodeAddress = (address) => {
  const requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GMAPS_GEOCODING_API_KEY;

  return fetch(requestUrl).then(r => r.json());
}