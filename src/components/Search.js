import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import AskMark from "./AskMarker";
import { useSelector, useDispatch } from "react-redux";
import { setAskMark } from "../actions/loadActions";

export default function Search({ panTo }) {
  const [coord, setCoord] = React.useState({ lat: null, lng: null });
  const askMark = useSelector((state) => state.markerReducer.askMark);

  const dispatch = useDispatch();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.29, lng: () => 127.05 },
      radius: 200 * 1000,
    },
  });

  let addr;

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setCoord({ lat, lng });
          panTo({ lat, lng });
          setAskMark(dispatch, true);
        } catch (error) {}
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
      {askMark ? <AskMark coord={coord} /> : null}
    </Combobox>
  );
}
