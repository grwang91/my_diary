//좀더 게시판같게 수정

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Div = styled.div`
  margin: 40px;
`;

class Diary extends React.Component {
  // state = {
  //   title: "",
  //   content: "",
  //   id: null,
  // };

  render() {
    const { history, diary, location } = this.props;

    const getDate = (date) => {
      return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
    };

    const getWeather = (weather) => {
      return `날씨 : ${weather.temperature}도, ${weather.sky}`;
    };

    if (!location.state) {
      history.push("/");
      return <div></div>;
    } else {
      let diaryData = diary[location.state.id - 1];
      //console.log(diary[location.state.id - 1].date);
      return (
        <Div>
          <h2>
            {getDate(diaryData.date)} {getWeather(diaryData.weather)}
          </h2>
          <h3>{diaryData.title}</h3>
          <h4>{diaryData.content}</h4>
        </Div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { diary: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(Diary);
