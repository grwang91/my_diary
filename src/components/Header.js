import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  // align-items: center;
`;

const StyledLink = styled(Link)`
  color: black;
  font-size: 20px;
  text-decoration: none;
`;

class Header extends React.Component {
  render() {
    return (
      <Div className="headerWrapper">
        <Span className="createWrapper">
          <StyledLink to="/createDiary">새 일기 쓰기</StyledLink>
        </Span>
        <Span className="mapWrapper">
          <StyledLink to="/diaryListMap">지도로 보기</StyledLink>
        </Span>
        <Span className="listWrapper">
          <StyledLink to="/">목록</StyledLink>
        </Span>
      </Div>
    );
  }
}

export default Header;
