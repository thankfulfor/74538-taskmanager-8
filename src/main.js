'use strict';

const TEMPLATE_CARDS_QUANTITY = 7;
const MAX_NUMBER = 20;

const getRandomNumber = function () {
  return Math.floor(Math.random() * Math.floor(MAX_NUMBER));
};

const filters = [
  {
    name: `ALL`,
    count: getRandomNumber(),
  },
  {
    name: `OVERDUE`,
    count: getRandomNumber(),
  },
  {
    name: `TODAY`,
    count: getRandomNumber(),
  },
  {
    name: `FAVORITES`,
    count: getRandomNumber(),
  },
  {
    name: `Repeating`,
    count: getRandomNumber(),
  },
  {
    name: `Tags`,
    count: getRandomNumber(),
  },
  {
    name: `ARCHIVE`,
    count: getRandomNumber(),
  }
];

const filtersParentElement = document.querySelector(`.main__filter`);
const cardsParentElement = document.querySelector(`.board__tasks`);

const showFilters = function (filtersArray) {
  const fragment = document.createDocumentFragment();
  filtersArray.forEach(function (item) {
    const templateFilterMarkup = document.querySelector(`#filter-template`).content;
    const filterElement = templateFilterMarkup.cloneNode(true);
    const filterInputElement = filterElement.querySelector(`.filter__input`);
    const filterLabelElement = filterElement.querySelector(`.filter__label`);
    const filterCountElement = filterElement.querySelector(`.filter__count`);
    const itemName = item.name.toLowerCase();

    filterInputElement.checked = item.name === `ALL`;
    filterInputElement.setAttribute(`id`, `filter__${itemName}`);

    filterLabelElement.setAttribute(`for`, `filter__${itemName}`);
    filterLabelElement.firstChild.textContent = `${item.name} `;
    filterLabelElement.addEventListener(`click`, function () {
      cardsParentElement.textContent = ``;
      showCards(getRandomNumber());
    });

    filterCountElement.className = `filter__${itemName}-count`;
    filterCountElement.textContent = `${item.count}`;

    fragment.appendChild(filterElement);
  });
  filtersParentElement.appendChild(fragment);
};

const showCards = function (cardsQuantity) {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= cardsQuantity; i++) {
    const templateCardMarkup = document.querySelector(`#card-template`).content;
    const filterElement = templateCardMarkup.cloneNode(true);
    fragment.appendChild(filterElement);
  }
  cardsParentElement.appendChild(fragment);
};

showFilters(filters);
showCards(TEMPLATE_CARDS_QUANTITY);
