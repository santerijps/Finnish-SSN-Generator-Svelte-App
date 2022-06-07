import { Sex } from "$lib/enum";

export const randomNumber = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

export const randomEvenNumber = (min, max) => {
  const n = randomNumber(min, max);
  if (n % 2 === 0) return n;
  if (n + 1 <= max) return n + 1;
  if (n - 1 >= min) return n - 1;
  throw Error(`Could not generate a random even number with (min, max) => (${min}, ${max})`);
};

export const randomOddNumber = (min, max) => {
  const n = randomNumber(min, max);
  if (n % 2 === 1) return n;
  if (n + 1 <= max) return n + 1;
  if (n - 1 >= min) return n - 1;
  throw Error(`Could not generate a random odd number with (min, max) => (${min}, ${max})`);
};

export const repeat = (n, callback) => {
  for (let i = 0; i < n; i++) {
    callback();
  }
};

export const sexToEnum = (sex = "") => {
  if (typeof sex === "string") {
    if (["m", "male"].includes(sex.toLowerCase()))
      return Sex.Male;
    if (["f", "female"].includes(sex.toLowerCase()))
      return Sex.Female;
  }
  return Sex.Random;
};
