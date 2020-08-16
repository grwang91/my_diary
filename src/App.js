import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import DiaryList from "./routes/DiaryList";
import createDiary from "./routes/createDiary";
import Header from "./components/Header";
import DiaryListMap from "./routes/DiaryListMap";
import Diary from "./routes/Diary";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { connect } from "react-redux";
import serverapi from "./api/serverapi";
import { checkTokenValid } from "./actions/loadActions";

class App extends React.Component {
  componentDidMount() {
    let { authorization, checkTokenValid } = this.props;

    checkTokenValid(authorization);
  }

  render() {
    let { checkToken } = this.props;
    if (checkToken) {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={DiaryList} />
            <Route exact path="/diary/:id" component={Diary} />
            <Route exact path="/createDiary" component={createDiary} />
            <Route exact path="/diaryListMap" component={DiaryListMap} />
            <Route path="*" component={DiaryList} />
          </Switch>
        </Router>
      );
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorization: state.loginReducer.authorization,
  checkToken: state.loginReducer.checkToken,
});

const mapDispatchToProps = (dispatch) => ({
  checkTokenValid: (authorization) => {
    return checkTokenValid(dispatch)(authorization);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
