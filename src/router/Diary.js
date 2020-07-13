import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Diary extends React.Component {
  state = {
    title: "",
    content: "",
    id: null,
  };

  // componentDidMount() {
  //   const { diary, history } = this.props;
  //   if (diary.length === 0) {
  //     console.log("redirect");
  //     history.push("/");
  //   }
  // }

  render() {
    const { history, diary } = this.props;
    console.log(diary);

    if (diary.length === 0) {
      history.push("/");
      return <div></div>;
    } else {
      return (
        <div>
          <h1>{diary[0].title}</h1>
          <h2>{diary[0].content}</h2>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { diary: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(Diary);
