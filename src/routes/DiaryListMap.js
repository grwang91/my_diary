import React from "react";
import NaverMap from "../components/NaverMap";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";

class DiaryListMap extends React.Component {
  render() {
    const { diaries } = this.props;
    return (
      <Container>
        <NaverMap></NaverMap>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    diaries: state.articleReducer.diaries,
  };
};

export default connect(mapStateToProps)(DiaryListMap);
