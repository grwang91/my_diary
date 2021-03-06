//좀더 게시판같게 수정

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import serverapi from "../api/serverapi";
import { Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

const Img = styled.img`
  width: 30%;
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

    const deleteDiary = (authorization, id, usrName) => {
      if (usrName !== this.props.usrName) {
        alert("작성자가 아닙니다");
      } else {
        serverapi.deleteDiary(authorization, id).then((response) => {
          if (response.message === "Success") {
            history.push("/");
          } else {
            alert("작성자가 아닙니다");
          }
        });
      }
    };

    if (!location.state) {
      return null;
    }

    let diary = diaries.find((diary) => diary.id === location.state.id);

    return (
      <Container>
        <h2>
          {getDate(diary.date)} {getWeather(diary.weather)}
        </h2>
        {diary.diaryPictures.map((picture) => (
          <Img key={picture.id} src={picture.pictureUrl} />
        ))}

        <h2>{diary.title}</h2>
        <h4>
          {diary.content.split("\n").map((txt) => (
            <>
              {txt}
              <br />
            </>
          ))}
        </h4>

        {this.props.usrName === diary.usrName ? (
          <>
            <Button
              variant="contained"
              color="default"
              onClick={() =>
                deleteDiary(this.props.authorization, diary.id, diary.usrName)
              }
            >
              삭제
            </Button>
            <Button
              variant="contained"
              component={Link}
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
            </Button>
          </>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    diaries: state.articleReducer.diaries,
    authorization: state.loginReducer.authorization,
    usrName: state.loginReducer.userName,
  };
}

export default connect(mapStateToProps)(Diary);
