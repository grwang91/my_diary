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
import "./Map.css";

// const Div = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 100%;
//   max-width: 400px;
//   z-index: 10;
// `;

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

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const [markers, setMarkers] = React.useState([]);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="search">
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
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
    </div>
  );
}
