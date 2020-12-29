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
import {
  tryGetMarkerAndDispatch,
  setMarkerToInput,
  setAskMark,
  setCoord,
} from "../actions/loadActions";

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

  const [selected, setSelected] = React.useState(null);

  const markers = useSelector((state) => state.markerReducer.markers);
  const coord = useSelector((state) => state.markerReducer.coord);
  const authorization = useSelector(
    (state) => state.loginReducer.authorization
  );
  const markerToInput = useSelector(
    (state) => state.markerReducer.markerToInput
  );

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
    setCoord(dispatch, { lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMarkerToInput(dispatch, true);
  });

  React.useEffect(() => {
    tryGetMarkerAndDispatch(dispatch, authorization);
    setMarkerToInput(dispatch, false);
    setAskMark(dispatch, false);
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
          setMarkerToInput(dispatch, false);
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
