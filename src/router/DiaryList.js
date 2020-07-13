import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class DiaryList extends React.Component {
  componentWillMount() {}

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
        <div>
          <span>제목&#9;</span>
          <span>작성일</span>
        </div>
        {diaries.map((diary) => (
          <div>
            <span>{diary.title}&#9;</span>
            <span>{getCreatedDate(diary.date)}</span>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { diaries: state.articleReducer.diaries };
}

export default connect(mapStateToProps)(DiaryList);
