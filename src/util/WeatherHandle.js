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

export let askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};
