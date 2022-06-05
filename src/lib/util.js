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
