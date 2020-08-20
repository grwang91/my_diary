import React from "react";
import { connect } from "react-redux";
import List from "../components/List";
import styled from "styled-components";
import { tryGetDiariesAndDispatch } from "../actions/loadActions";
import { getCreatedDate } from "../util/DateHandle";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  padding: 0 50px 0 50px;
`;

class DiaryList extends React.Component {
  componentDidMount() {
    let { tryGetDiariesAndDispatch } = this.props;

    tryGetDiariesAndDispatch(this.props.authorization);
  }

  render() {
    const { diaries } = this.props;

    console.log(diaries);
    return (
      <Div className="diaryList">
        <List id={-1} title="제목" creator="작성자" createdTime="작성일" />
        {diaries.map((diary) => (
          <List
            key={diary.id}
            id={diary.id}
            title={diary.title}
            creator={diary.usrName}
            createdTime={getCreatedDate(diary.date)}
          />
        ))}
      </Div>
    );
  }
}

function mapStateToProps(state) {
  return {
    diaries: state.articleReducer.diaries,
    authorization: state.loginReducer.authorization,
  };
}

let mapDispatchToProps = (dispatch) => ({
  tryGetDiariesAndDispatch: (authorization) => {
    return tryGetDiariesAndDispatch(dispatch)(authorization);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryList);
