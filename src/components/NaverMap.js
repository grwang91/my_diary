//지도 API 연동

import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import { NAVER_MAP_API_KEY } from "../common/apiKey";

const NAVER_API_KEY = NAVER_MAP_API_KEY;

class Map extends React.Component {
  render() {
    return (
      <RenderAfterNavermapsLoaded ncpClientId={NAVER_API_KEY}>
        <NaverMap
          mapDivId={"map"}
          style={{
            width: 800,
            height: 800,
          }}
          zoom={7}
        >
          <Marker position={{ lat: 37, lng: 126.97 }} />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    );
  }
}

export default Map;
