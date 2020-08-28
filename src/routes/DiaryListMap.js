import React from "react";
import NaverMap from "../components/NaverMap";
import { Container } from "@material-ui/core";

class DiaryListMap extends React.Component {
  render() {
    return (
      <Container>
        <NaverMap></NaverMap>
      </Container>
    );
  }
}

export default DiaryListMap;
