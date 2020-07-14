import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Diary extends React.Component {
  state = {
    title: "",
    content: "",
    id: null,
  };

  render() {
    const { history, diary, location } = this.props;

    if (!location.state) {
      history.push("/");
      return <div></div>;
    } else {
      return (
        <div>
          <h1>{diary[location.state.id - 1].title}</h1>
          <h2>{diary[location.state.id - 1].content}</h2>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { diary: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(Diary);
