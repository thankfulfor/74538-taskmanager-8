'use strict';


const TEMPLATE_CARDS_QUANTITY = 7;
const MAX_NUMBER = 20;

const getRandomNumber = function () {
  return Math.floor(Math.random() * Math.floor(MAX_NUMBER));
};

const filters = [
  {
    checked: true,
    name: `ALL`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `OVERDUE`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `TODAY`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `FAVORITES`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `Repeating`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `Tags`,
    count: getRandomNumber(),
  },
  {
    checked: false,
    name: `ARCHIVE`,
    count: getRandomNumber(),
  }
];

const filtersParentElement = document.querySelector(`.main__filter`);
const cardsParentElement = document.querySelector(`.board__tasks`);

filters.forEach(function (filter) {
  filtersParentElement.insertAdjacentHTML(`beforeend`, window.renderFilter(filter.checked, filter.name, filter.count));
});

let cardList = ``;
const showCards = function (cardsQuantity) {
  for (let i = 1; i <= cardsQuantity; i++) {
    cardList += window.renderTemplate();
  }
  cardsParentElement.innerHTML = cardList;
};

showCards(TEMPLATE_CARDS_QUANTITY);
