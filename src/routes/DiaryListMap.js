import React from "react";
import Map from "../components/Map";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";

class DiaryListMap extends React.Component {
  render() {
    const { diaries } = this.props;
    return (
      //<Container>
      <Map></Map>
      //</Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    diaries: state.articleReducer.diaries,
  };
};

export default connect(mapStateToProps)(DiaryListMap);
