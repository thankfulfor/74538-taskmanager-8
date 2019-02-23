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

const filterLabelClickHandler = function () {
  cardsParentElement.innerHTML = ``;
  showCards(getRandomNumber());
};

const showCardsByClick = function () {
  const filterLabelElements = filtersParentElement.querySelectorAll(`.filter__label`);
  for (let i = 0; i < filterLabelElements.length; i++) {
    filterLabelElements[i].addEventListener(`click`, filterLabelClickHandler);
  }
};

const showFilters = function () {
  let filterList = ``;
  for (let i = 0; i < filters.length; i++) {
    filterList += window.renderFilter(filters[i].checked, filters[i].name, filters[i].count);
  }
  filtersParentElement.innerHTML = filterList;
  showCardsByClick();
};

const showCards = function (cardsQuantity) {
  let cardList = ``;
  for (let i = 1; i <= cardsQuantity; i++) {
    cardList += window.renderCard();
  }
  cardsParentElement.innerHTML = cardList;
};

showFilters();
showCards(TEMPLATE_CARDS_QUANTITY);
