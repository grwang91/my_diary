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
import MarkerInput from "./MarkerInput";
import { useSelector, useDispatch } from "react-redux";
import { tryGetMarkerAndDispatch } from "../actions/loadActions";

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
  const [markers, setMarkers] = React.useState(
    useSelector((state) => state.markerReducer.markers)
  );
  const [selected, setSelected] = React.useState(null);
  const [markerToInput, setMarkerToInput] = React.useState(false);
  const [authorization, setAuthorization] = React.useState(
    useSelector((state) => state.loginReducer.authorization)
  );
  const [coord, setCoord] = React.useState({ lat: null, lng: null });

  const dispatch = useDispatch();
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const onMapDblClick = React.useCallback((event) => {
    setCoord({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMarkerToInput(true);
  });

  React.useEffect(() => {
    console.log("dd");
    tryGetMarkerAndDispatch(dispatch, authorization);
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
        onDblClick={onMapDblClick}
        onClick={() => {
          setSelected(null);
          setMarkerToInput(false);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2> {selected.placeName}</h2>
              <p>{selected.placeContent}</p>
            </div>
          </InfoWindow>
        ) : null}
        {markerToInput ? <MarkerInput coord={coord} /> : null}
      </GoogleMap>
    </div>
  );
}
