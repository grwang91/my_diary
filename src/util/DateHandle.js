export const getCreatedDate = (date) => {
  date = new Date(date);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return year === currentYear && month === currentMonth && day === currentDay
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

//const
