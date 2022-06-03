import { randomNumber } from "$lib/util";

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export class CurrentDate {
  static get date() {
    return new Date()
  }
  static get day() {
    return new Date().getDate();
  }
  static get month() {
    return new Date().getMonth()
  }
  static get year() {
    return new Date().getFullYear();
  }
}

const dateGE = (a, b) => {
  const tmpA = new Date(a);
  const tmpB = new Date(b);
  tmpA.setHours(0, 0, 0, 0);
  tmpB.setHours(0, 0, 0, 0);
  return tmpA >= tmpB;
};

const dateLE = (a, b) => {
  const tmpA = new Date(a);
  const tmpB = new Date(b);
  tmpA.setHours(0, 0, 0, 0);
  tmpB.setHours(0, 0, 0, 0);
  return tmpA <= tmpB;
};

const isSameDate = (a, b) => {
  const isSame
    =   a.getFullYear() === b.getFullYear()
    &&  a.getMonth() === b.getMonth()
    &&  a.getDate() === b.getDate()
  ;
  return isSame;
};

export const extractHumanValues = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

const isLeapYear = (year) => {
  if (year % 4 !== 0)   return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
};

const randomDay = (year, month, min, max) => {
  if (month === 2 && isLeapYear(year)) return randomNumber(Math.max(1, min || 1), Math.min(29, max || 29));
  return randomNumber(Math.max(1, min || 1), Math.min(DAYS_PER_MONTH[month] + 1, max || DAYS_PER_MONTH[month] + 1));
};

const randomMonth = (min, max) => {
  return randomNumber(Math.max(0, min || 0), Math.min(11, max || 11));
};

const dateRange = (minDate, maxDate) => {
  const dates = [];
  const tmp = new Date(minDate);
  while (tmp <= maxDate) {
    dates.push(new Date(tmp));
    tmp.setDate(tmp.getDate() + 1);
  }
  return dates;
};

const randomDateFromRange = (minDate, maxDate) => {
  const dates = dateRange(minDate, maxDate);
  return dates[randomNumber(0, dates.length - 1)];
};

export const randomDate = (minDate, maxDate) => {

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

  const minMonth = minDate.getMonth();
  const maxMonth = maxDate.getMonth();

  const minDay = minDate.getDate();
  const maxDay = maxDate.getDate();

  const year  = randomNumber(minYear, maxYear);
  const month = randomMonth(minMonth, maxMonth);
  const day   = randomDay(year, month, minDay, maxDay);

  return new Date(year, month, day);
};

export const randomBirthdayForAge = (age) => {
  // The birthday date could be:
  // 1. Today - age (on this day 'age' years ago)
  // 2. Today - age - 1 year + 1 day
  const minDate = CurrentDate.date;
  minDate.setFullYear(minDate.getFullYear() - age - 1);
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = CurrentDate.date;
  maxDate.setFullYear(maxDate.getFullYear() - age);

  return randomDateFromRange(minDate, maxDate);
};

export const randomBirthdayForAgeRange = (minAge, maxAge) => {
  // The birthday date could be:
  // 1. Today - minAge (on this day 'minAge' years ago)
  // 2. Today - maxAge - 1 year + 1 day
  const minDate = CurrentDate.date;
  minDate.setFullYear(minDate.getFullYear() - maxAge - 1);
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = CurrentDate.date;
  maxDate.setFullYear(maxDate.getFullYear() - minAge);

  return randomDateFromRange(minDate, maxDate);
};
