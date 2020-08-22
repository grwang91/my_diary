import React from "react";
import { Tabs, AppBar, Tab, IconButton } from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { tryLogoutAndDispatch } from "../actions/loadActions";

class Navigation extends React.Component {
  render() {
    let { tryLogout } = this.props;

    const logout = () => {
      tryLogout();
    };

    return (
      <AppBar position="static">
        <Tabs value={false} centered indicatorColor="secondary">
          <Tab label="새 글" component={Link} to="createDiary" />
          <Tab label="지도로 보기" component={Link} to="diaryListMap" />
          <Tab label="목록" component={Link} to="/" />
          <IconButton color="default" onClick={logout}>
            <ExitToAppOutlined style={{ color: red[0] }} />
          </IconButton>
        </Tabs>
      </AppBar>
    );
  }
}

let mapDispatchToProps = (dispatch) => ({
  tryLogout: () => {
    return tryLogoutAndDispatch(dispatch);
  },
});

export default connect(null, mapDispatchToProps)(Navigation);
