//좀더 게시판같게 수정

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import serverapi from "../api/serverapi";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Div = styled.div`
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-direction: column;
  margin: 40px;
`;

const Img = styled.img`
  width: 30%;
`;

// const Button = styled.button`
//   //width: 40px;
//   color: black;
//   font-size: 16px;
//   padding: 0 20px 0 20px;
//   border: 1px solid black;
//   background: white;
//   margin-left: 20px;
// `;

const StyledLink = styled(Link)`
  width: 20px;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
  margin-left: 20px;
`;

class Diary extends React.Component {
  componentDidMount() {
    const { history, location } = this.props;

    if (location.state === undefined) {
      history.push("/");
    }
  }

  render() {
    const { history, diaries, location } = this.props;

    const getDate = (date) => {
      date = new Date(date);
      return `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`;
    };

    const getWeather = (weather) => {
      return `날씨 : ${parseInt(weather.temperature + 0.5)}도, ${weather.sky}`;
    };

    const deleteDiary = (authorization, id) => {
      serverapi.deleteDiary(authorization, id).then((response) => {
        if (response.message === "Success") {
          history.push("/");
        } else {
          alert("작성자가 아닙니다");
        }
      });
    };

    if (!location.state) {
      return null;
    }

    let diary = diaries.find((diary) => diary.id === location.state.id);

    return (
      <Div>
        <h2>
          {getDate(diary.date)} {getWeather(diary.weather)}
          <Button
            variant="contained"
            color="default"
            onClick={() => deleteDiary(this.props.authorization, diary.id)}
          >
            삭제
          </Button>
          <StyledLink
            to={{
              pathname: "/createDiary",
              state: {
                title: diary.title,
                content: diary.content,
                update: true,
                id: diary.id,
              },
            }}
          >
            수정
          </StyledLink>
        </h2>
        {diary.diaryPictures.map((picture) => (
          <Img key={picture.id} src={picture.pictureUrl} />
        ))}

        <h3>{diary.title}</h3>
        <h4>{diary.content}</h4>
      </Div>
    );
  }
}

function mapStateToProps(state) {
  return {
    diaries: state.articleReducer.diaries,
    authorization: state.loginReducer.authorization,
  };
}

export default connect(mapStateToProps)(Diary);
