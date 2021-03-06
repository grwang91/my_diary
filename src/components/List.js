import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: 80%;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

const StyledSpan = styled.span`
  width: 20%;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
`;

const Title = styled.span`
  width: 80%;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
`;

function distinguishTitle(id, title) {
  return id < 0 ? (
    <Title>{title}</Title>
  ) : (
    <StyledLink
      to={{
        pathname: `/diary/${id}`,
        state: {
          id,
        },
      }}
    >
      {title}
    </StyledLink>
  );
}

function List({ title, createdTime, id, creator }) {
  return (
    <Wrapper>
      {distinguishTitle(id, title)}
      <StyledSpan>{creator}</StyledSpan>
      <StyledSpan>{createdTime}</StyledSpan>
    </Wrapper>
  );
}

export default List;
