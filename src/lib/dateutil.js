import { randomNumber } from "$lib/util";

export const newDateZeroTime = (date) => {
  date = date ? new Date(date) : new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const newDateDelta = (date, yearDelta = 0, monthDelta = 0, dayDelta = 0) => {
  date = date ? new Date(date) : new Date();
  date.setUTCFullYear(date.getUTCFullYear() + yearDelta);
  date.setUTCMonth(date.getUTCMonth() + monthDelta);
  date.setUTCDate(date.getUTCDate() + dayDelta);
  return date;
};

export const randomDate = (minDate, maxDate) => {
  const timestamp = randomNumber(+minDate, +maxDate);
  return newDateZeroTime(new Date(timestamp));
};

export const randomDateFromAge = (years) => {
  const
    minDate = newDateDelta(newDateZeroTime(), -(years + 1), 0, +1),
    maxDate = newDateDelta(newDateZeroTime(), -years, 0, 0);
  return randomDate(minDate, maxDate);
};

export const randomDateFromAgeRange = (minYears, maxYears) => {
  const years = randomNumber(minYears, maxYears);
  return randomDateFromAge(years);
};
