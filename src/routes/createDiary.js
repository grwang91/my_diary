//날씨정보 API받아서 추가하기
//사진 업로드
//내용 입력창 다듬기

import React from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import { connect } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  color: red;
  flex-direction: column;
  align-items: center;
  height: 800px;
`;

const Title = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 20px;
`;

const Content = styled.input`
  width: 80%;
  height: 100%;
  vertical-align: text-top;
  white-space: normal;
`;

const Button = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 20px;
`;

let weather = {};

let getWeather = (lat, lng) => {
  const API_KEY = "0a3907ad9c80678e723b18b374fb6c99";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const sky = json.weather[0].main;
      weather = {
        temperature,
        sky,
      };
    });
};

let handleGeoError = () => {
  console.log("getGeoError");
};

let handleGeoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude);
};

let askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

class createDiary extends React.Component {
  state = {
    title: "",
    content: "",
  };

  componentDidMount() {
    askForCoords();
  }

  render() {
    const { history } = this.props;

    let saveDiary = () => {
      if (this.state.title === "") {
        alert("제목을 입력하세요");
      } else if (this.state.content === "") {
        alert("내용을 입력하세요");
      } else {
        var input = document.querySelector('input[type="file"]');
        var data = new FormData();

        data.append("title", this.state.title);
        data.append("content", this.state.content);
        data.append("weather", JSON.stringify(weather));

        if (input.files.length === 0) {
          data.append("selectedFile", "dd");
        } else {
          data.append("selectedFile", input.files[0]);
        }

        serverapi
          .createDiary(this.props.authorization, data)
          .then((response) => {
            console.log(response);
            history.push(`/`);
          });
      }
    };

    return (
      <>
        <Wrapper className="createWrapper">
          <Title
            placeholder="title"
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
          <Content
            placeholder="content"
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
            value={this.state.content}
          />
          <Title type="file"></Title>
          <Button onClick={saveDiary}>완료</Button>
        </Wrapper>
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  authorization: state.loginReducer.authorization,
});

export default connect(mapStateToProps)(createDiary);
