import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as types from "../actions/actionTypes";

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
    date: "",
  };

  render() {
    const { history, addDiary } = this.props;

    let saveDiary = () => {
      if (this.state.title === "") {
        alert("제목을 입력하세요");
      } else if (this.state.content === "") {
        alert("내용을 입력하세요");
      } else {
        addDiary(this.state);
        history.push(`/`);
      }
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

function mapDispatchToProps(dispatch) {
  return {
    addDiary: (diary) => {
      diary.date = new Date();
      dispatch({
        type: types.ADD_DIARY,
        data: diary,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(createDiary);
