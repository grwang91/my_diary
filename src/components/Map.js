//지도 API 연동

import React from "react";
import { GOOGLE_MAP_API_KEY } from "../common/apiKey";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Search from "./Search";

const libraries = ["places"];
const mapContainerStyle = {
  width: "98vw",
  height: "93vh",
};
const center = {
  lat: 37.29,
  lng: 127.05,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  disableDoubleClickZoom: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <Search />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onDblClick={(event) => {
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </>
  );
}
