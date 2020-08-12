import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { tryLogoutAndDispatch } from "../actions/loadActions";

const Span = styled.span`
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  background-color: rgb(226, 235, 240);
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: black;
  font-size: 20px;
  text-decoration: none;
`;

const Button = styled.button`
  border: 1px;
  background: none;
  height: 100%;
  cursor: pointer;
  margin-left: 50px;
`;

class Header extends React.Component {
  render() {
    let { tryLogout } = this.props;

    const logout = () => {
      tryLogout();
    };

    return (
      <Div className="headerWrapper">
        <Span className="createWrapper">
          <StyledLink to="/createDiary">새 글</StyledLink>
        </Span>
        <Span className="mapWrapper">
          <StyledLink to="/diaryListMap">지도로 보기</StyledLink>
        </Span>
        <Span className="listWrapper">
          <StyledLink to="/">목록</StyledLink>
        </Span>
        <Button onClick={logout}>로그아웃</Button>
      </Div>
    );
  }
}

let mapDispatchToProps = (dispatch) => ({
  tryLogout: () => {
    return tryLogoutAndDispatch(dispatch);
  },
});

export default connect(null, mapDispatchToProps)(Header);
