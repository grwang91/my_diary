//좀더 게시판같게 수정

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import serverapi from "../api/serverapi";

const Div = styled.div`
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-direction: column;
  margin: 40px;
`;

const Button = styled.button`
  margin-left: 60px;
`;

class Diary extends React.Component {
  render() {
    const { history, diaries, location } = this.props;
    console.log(this.props);

    const getDate = (date) => {
      date = new Date(date);
      return `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`;
    };

    const getWeather = (weather) => {
      return `날씨 : ${parseInt(weather.temperature + 0.5)}도, ${weather.sky}`;
    };

    const deleteDiary = (id) => {
      console.log("dd");
      serverapi.deleteDiary(id).then(() => {
        history.push("/");
      });
    };

    if (!location.state) {
      history.push("/");
      return <div></div>;
    } else {
      let diary = diaries.find((diary) => diary.id === location.state.id);

      return (
        <Div>
          <h2>
            {getDate(diary.date)} {getWeather(diary.weather)}
            <Button> 삭제</Button>
            {/* <Button onClick={deleteDiary(diary.id)}>삭제</Button> */}
          </h2>
          <h3>{diary.title}</h3>
          <h4>{diary.content}</h4>
        </Div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { diaries: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(Diary);
