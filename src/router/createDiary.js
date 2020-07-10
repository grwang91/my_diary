import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Redirect } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  color: red;
  flex-direction: column;
  align-items: center;
  height: 800px;
`;

const Title = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 20px;
`;

const Content = styled.input`
  width: 80%;
  height: 100%;
  vertical-align: text-top;
  white-space: normal;
`;

const Button = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 20px;
`;

class createDiary extends React.Component {
  state = {
    title: "",
    content: "",
  };

  render() {
    const { history } = this.props;

    let saveDiary = () => {
      console.log(this.state);
      history.push("/");
    };

    return (
      <>
        <Wrapper className="createWrapper">
          <Title
            placeholder="title"
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
          <Content
            placeholder="content"
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
            value={this.state.content}
          />
          <Button onClick={saveDiary}>완료</Button>
        </Wrapper>
      </>
    );
  }
}

export default createDiary;
