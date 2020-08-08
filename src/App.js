import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import DiaryList from "./routes/DiaryList";
import createDiary from "./routes/createDiary";
import Header from "./components/Header";
import DiaryListMap from "./routes/DiaryListMap";
import Diary from "./routes/Diary";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={DiaryList} />
        <Route exact path="/diary/:id" component={Diary} />
        <Route exact path="/createDiary" component={createDiary} />
        <Route exact path="/diaryListMap" component={DiaryListMap} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Router>
    );
  }
}

export default App;
