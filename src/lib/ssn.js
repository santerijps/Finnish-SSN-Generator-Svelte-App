import { newDateZeroTime, newDateDelta, randomDateFromAgeRange } from "$lib/dateutil";
import { randomNumber, randomEvenNumber, randomOddNumber } from "$lib/util";
import { Sex } from "$lib/enum";

const parseDateShortFormat = (date) => {
  const
    year  = String(date.getUTCFullYear()),
    month = String(date.getUTCMonth() + 1),
    day   = String(date.getUTCDate());
  return (
    day.padStart(2, "0")
    + month.padStart(2, "0")
    + year.substring(year.length - 2)
  );
};

const getDelimiter = (date) => {
  const
    delimiters = {20: "A", 19: "-", 18: "+"},
    year = date.getUTCFullYear(),
    century = Math.floor(year / 100);
  return delimiters[century];
};

const randomIdentityNumber = (sex) => {
  const n
    = sex === Sex.Male ? randomOddNumber(2, 899)
    : sex === Sex.Female ? randomEvenNumber(2, 899)
    : randomNumber(2, 899);
  return String(n).padStart(3, "0");
};

const getCheckSymbol = (nineDigitNumber) => {
  const checkSymbols = "0123456789ABCDEFHJKLMNPRSTUVWXY";
  return checkSymbols[nineDigitNumber % 31];
};

const generateSsnFromDate = (date, sex) => {
  const
    dateOfBirth     = parseDateShortFormat(date),
    delimiter       = getDelimiter(date),
    identityNumber  = randomIdentityNumber(sex),
    nineDigitNumber = parseInt(dateOfBirth + identityNumber),
    checkSymbol     = getCheckSymbol(nineDigitNumber);
  return (
    dateOfBirth
    + delimiter
    + identityNumber
    + checkSymbol
  );
};

const generateSsnAgeExactly = (years, sex) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, 0);
  return generateSsnFromDate(date, sex);
};

const generateSsnAgeOneDayShyFrom = (years) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, +1);
  return generateSsnFromDate(date);
};

const generateSsnAgeOneDayOver = (years) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, -1);
  return generateSsnFromDate(date);
};

const generateSsnAgeBetween = (minYears, maxYears, sex) => {
  const date = randomDateFromAgeRange(minYears, maxYears);
  return generateSsnFromDate(date, sex);
};

export class RandomSSN {

  static exactly(years, sex) {
    return generateSsnAgeExactly(years, sex);
  }

  static almost(years) {
    return generateSsnAgeOneDayShyFrom(years);
  }

  static barely(years) {
    return generateSsnAgeOneDayOver(years);
  }

  static between(minYears, maxYears, sex) {
    return generateSsnAgeBetween(minYears, maxYears, sex);
  }

}