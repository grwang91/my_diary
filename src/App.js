import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import DiaryList from "./router/DiaryList";
import createDiary from "./router/createDiary";
import Header from "./components/Header";
import DiaryListMap from "./router/DiaryListMap";
import Diary from "./router/Diary";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={DiaryList} />
        <Route exact path="/diary/:id" component={Diary} />
        <Route exact path="/createDiary" component={createDiary} />
        <Route exact path="/diaryListMap" component={DiaryListMap} />
      </Router>
    );
  }
}

export default App;
