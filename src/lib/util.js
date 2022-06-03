const isEven = (x) => {
  return x % 2 === 0;
};

const isOdd = (x) => {
  return x % 2 !== 0;
};

const evens = (arrayOfNumbers) => {
  return arrayOfNumbers.filter(isEven);
};

const odds = (arrayOfNumbers) => {
  return arrayOfNumbers.filter(isOdd);
};

const range = (min, max) => {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

const evenRange = (min, max) => {
  return evens(range(min, max));
};

const oddRange = (min, max) => {
  return odds(range(min, max));
};

export const randomNumber = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

export const randomEvenNumber = (min, max) => {
  const numbers = evenRange(min, max);
  return numbers[randomNumber(0, numbers.length - 1)];
};

export const randomOddNumber = (min, max) => {
  const numbers = oddRange(min, max);
  return numbers[randomNumber(0, numbers.length - 1)];
};
