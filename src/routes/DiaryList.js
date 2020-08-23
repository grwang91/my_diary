import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@material-ui/core";
import { tryGetDiariesAndDispatch } from "../actions/loadActions";
import { getCreatedDate } from "../util/DateHandle";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

class DiaryList extends React.Component {
  componentDidMount() {
    let { tryGetDiariesAndDispatch } = this.props;

    tryGetDiariesAndDispatch(this.props.authorization);
  }

  render() {
    const { diaries } = this.props;

    let reverseDiaries = diaries.reverse();
    return (
      <Container>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reverseDiaries.map((diary) => (
              <TableRow
                key={diary.id}
                component={StyledLink}
                to={{
                  pathname: `/diary/${diary.id}`,
                  state: {
                    id: diary.id,
                  },
                }}
              >
                <TableCell>{diary.title}</TableCell>
                <TableCell>{diary.usrName}</TableCell>
                <TableCell>{getCreatedDate(diary.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
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
