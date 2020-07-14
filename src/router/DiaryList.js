import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import List from "../components/List";

const StyledLink = styled(Link)`
  color: black;
  font-size: 16px;
  text-decoration: none;
`;

class DiaryList extends React.Component {
  render() {
    const getCreatedDate = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      return year === currentYear &&
        month === currentMonth &&
        day === currentDay
        ? `${fitDigit(hour)}:${fitDigit(minute)}`
        : `${year}.${fitDigit(month + 1)}.${fitDigit(day)}`;
    };

    const fitDigit = (number) => {
      if (number / 10 < 1) {
        return "0" + number;
      } else {
        return number;
      }
    };

    const { diaries } = this.props;

    return (
      <div className="diaryList">
        <List id={-1} title="제목" createdTime="작성일" />
        {diaries.map((diary) => (
          <List
            key={diary.id}
            id={diary.id}
            title={diary.title}
            createdTime={getCreatedDate(diary.date)}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { diaries: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(DiaryList);
