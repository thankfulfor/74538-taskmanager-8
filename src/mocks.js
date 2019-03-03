import {getRandomNumber, getRandomBoolean} from './utils';

const MILLISECONDS_IN_TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const DAYS_IN_WEEK = 7;
const HASHTAGS_MAX_QUANTITY = 3;

const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const hashtags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `chart`,
  `theme`,
  `pot`,
  `kettle`,
]);

export const getTaskData = () => ({
  title: titles[getRandomNumber(titles.length)],
  dueDate: new Date(Date.now() - (DAYS_IN_WEEK * MILLISECONDS_IN_TWENTY_FOUR_HOURS) +
    getRandomNumber(DAYS_IN_WEEK * 2) * MILLISECONDS_IN_TWENTY_FOUR_HOURS),
  get tags() {
    const randomTagsSet = new Set();
    for (let i = 0; i <= getRandomNumber(HASHTAGS_MAX_QUANTITY); i++) {
      randomTagsSet.add(Array.from(hashtags)[getRandomNumber(hashtags.size)]);
    }
    return randomTagsSet;
  },
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: colors[getRandomNumber(colors.length)],
  repeatingDays: {
    'Mo': getRandomBoolean(),
    'Tu': getRandomBoolean(),
    'We': getRandomBoolean(),
    'Th': getRandomBoolean(),
    'Fr': getRandomBoolean(),
    'Sa': getRandomBoolean(),
    'Su': getRandomBoolean(),
  },
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean(),
});
