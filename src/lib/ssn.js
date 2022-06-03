import
{ CurrentDate
, extractHumanValues
, randomBirthdayForAge
, randomBirthdayForAgeRange
, randomDate
} from "$lib/date-util";

import { Age, Sex } from "$lib/enum";
import { randomNumber, randomOddNumber, randomEvenNumber } from "$lib/util";

const MIN_DATE = new Date(1800, 0, 1)
const MAX_DATE = new Date(2099, 11, 31)

const MAX_INDIVIDUAL_NUMBER = 899;
const MIN_INDIVIDUAL_NUMBER = 2;

const getDateOfBirth = (day, month, year) => {
  const dateOfBirth
    = String(day).padStart(2, "0")
    + String(month).padStart(2, "0")
    + String(year).substring(String(year).length - 2)
  ;
  return dateOfBirth;
};

const getDelimiter = (year) => {
  const delimiters = {20: "A", 19: "-", 18: "+"};
  return delimiters[Math.floor(year / 100)];
};

const randomIndividualNumber = (sex = Sex.Random) => {
  const individualNumber
    = sex === Sex.Male ? randomOddNumber(MIN_INDIVIDUAL_NUMBER, MAX_INDIVIDUAL_NUMBER)
    : sex === Sex.Female ? randomEvenNumber(MIN_INDIVIDUAL_NUMBER, MAX_INDIVIDUAL_NUMBER)
    : randomNumber(MIN_INDIVIDUAL_NUMBER, MAX_INDIVIDUAL_NUMBER)
  ;
  return String(individualNumber).padStart(3, "0");
};

const getCheckSymbol = (nineDigitNumber) => {
  const checkSymbols = "0123456789ABCDEFHJKLMNPRSTUVWXY";
  return checkSymbols[nineDigitNumber % 31];
};

export const getRandomSSN = (age = Age.Random, sex = Sex.Random, {exactAge, minAge, maxAge}) => {

  let date;

  switch (age) {
    case Age.Random:
      date = randomDate(MIN_DATE, CurrentDate.date);
      break;
    case Age.Exact:
      date = randomBirthdayForAge(exactAge);
      break;
    case Age.Range:
      date = randomBirthdayForAgeRange(minAge, maxAge);
      break;
    default:
      throw Error(`Bad age option! Got "${age}"`);
  }

  const {day, month, year}    = extractHumanValues(date);
  const dateOfBirth           = getDateOfBirth(day, month, year);
  const delimiter             = getDelimiter(year);
  const individualNumber      = randomIndividualNumber(sex);
  const nineDigitNumber       = parseInt(dateOfBirth + individualNumber)
  const checkSymbol           = getCheckSymbol(nineDigitNumber);

  const ssn
    = dateOfBirth
    + delimiter
    + individualNumber
    + checkSymbol
  ;

  return ssn;
};
