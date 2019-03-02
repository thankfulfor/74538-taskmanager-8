import {getRandomNumber} from './utils.js';
const MILLISECONDS_IN_TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const DAYS_IN_WEEK = 7;

export const getTask = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomNumber(3)],
  dueDate: new Date(Date.now() - (DAYS_IN_WEEK * MILLISECONDS_IN_TWENTY_FOUR_HOURS) +
    getRandomNumber(DAYS_IN_WEEK * 2) * MILLISECONDS_IN_TWENTY_FOUR_HOURS),
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `chart`,
    `theme`,
    `pot`,
    `kettle`,
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][getRandomNumber(5)],
  repeatingDays: {
    'Mo': !!getRandomNumber(2),
    'Tu': !!getRandomNumber(2),
    'We': !!getRandomNumber(2),
    'Th': !!getRandomNumber(2),
    'Fr': !!getRandomNumber(2),
    'Sa': !!getRandomNumber(2),
    'Su': !!getRandomNumber(2),
  },
  isFavorite: !!getRandomNumber(2),
  isDone: !!getRandomNumber(2),
});


