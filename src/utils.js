export const getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

export const getRandomBoolean = function () {
  return !!(Math.floor(Math.random() * 2));
};
