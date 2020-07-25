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
    tryGetDiariesAndDispatch();
  }

  render() {
    const { diaries } = this.props;

    return (
      <Div className="diaryList">
        <List id={-1} title="제목" createdTime="작성일" />
        {diaries.map((diary) => (
          <List
            key={diary.id}
            id={diary.id}
            title={diary.title}
            createdTime={getCreatedDate(diary.date)}
          />
        ))}
      </Div>
    );
  }
}

function mapStateToProps(state) {
  return { diaries: state.articleReducer.diaries };
}

let mapDispatchToProps = (dispatch) => ({
  tryGetDiariesAndDispatch: () => {
    return tryGetDiariesAndDispatch(dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryList);
