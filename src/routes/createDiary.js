import React from "react";
import serverapi from "../api/serverapi";
import { connect } from "react-redux";
import { TextField, Button, Container } from "@material-ui/core";

let weather = {};

let geoData = {};

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
  geoData = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
};

let askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

class createDiary extends React.Component {
  state = {
    title: "",
    content: "",
    modify: false,
    id: -1,
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      this.setState({
        title: location.state.title,
        content: location.state.content,
        update: location.state.update,
        id: location.state.id,
      });
    }
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
        data.append("selectedFile", input.files[0]);
        data.append("geoData", JSON.stringify(geoData));

        // EXIF.getData(input.files[0], function () {
        //   let dat = EXIF.getAllTags(this);
        //   console.log(dat);
        // });

        // console.log(input.files[0]);

        serverapi
          .createDiary(this.props.authorization, data)
          .then((response) => {
            history.push(`/`);
          });
      }
    };

    let updateDiary = () => {
      if (this.state.title === "") {
        alert("제목을 입력하세요");
      } else if (this.state.content === "") {
        alert("내용을 입력하세요");
      } else {
        var data = new FormData();
        data.append("title", this.state.title);
        data.append("content", this.state.content);
        data.append("id", this.state.id);
      }

      serverapi.updateDiary(this.props.authorization, data).then((response) => {
        console.log(response);
        if (response.message === "Success") {
          history.push("/");
        } else {
          alert("작성자가 아닙니다");
        }
      });
    };

    let saveOrUpdateDiary = () => {
      if (this.state.update) {
        updateDiary();
      } else {
        saveDiary();
      }
    };

    return (
      <>
        <Container>
          <TextField
            label="title"
            fullWidth="true"
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
          <TextField
            label="content"
            fullWidth="true"
            multiline="true"
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
            value={this.state.content}
          />
          <TextField type="file" />
          <div>
            <Button onClick={saveOrUpdateDiary}>완료</Button>
          </div>
        </Container>
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  authorization: state.loginReducer.authorization,
});

export default connect(mapStateToProps)(createDiary);
