import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: 100%;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  height: 40px;
`;

const StyledSpan = styled.span`
  width: 100px;
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 0 20px 0 20px;
  border: 1px solid black;
`;

const Title = styled.span`
  width: 100%;
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

function List({ title, createdTime, id }) {
  return (
    <Wrapper>
      {distinguishTitle(id, title)}
      <StyledSpan>{createdTime}</StyledSpan>
    </Wrapper>
  );
}

export default List;
