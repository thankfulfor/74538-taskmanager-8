'use strict';

const filters = [
  {
    name: `ALL`,
    count: 5,
  },
  {
    name: `OVERDUE`,
    count: 0,
  },
  {
    name: `TODAY`,
    count: 0,
  },
  {
    name: `FAVORITES`,
    count: 7,
  },
  {
    name: `Repeating`,
    count: 2,
  },
  {
    name: `Tags`,
    count: 6,
  },
  {
    name: `ARCHIVE`,
    count: 5,
  }
];

const MAX_NUMBER = 20;
const TEMPLATE_CARDS_QUANTITY = 6;

const getRandomNumber = function () {
  return Math.floor(Math.random() * Math.floor(MAX_NUMBER));
};

const filtersParentElement = document.querySelector(`.main__filter`);
const cardsParentElement = document.querySelector(`.board__tasks`);

const showFilters = function (array) {
  const fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    const templateFilterMarkup = document.querySelector(`#filter-template`).content;
    const filterElement = templateFilterMarkup.cloneNode(true);
    const labelElement = filterElement.querySelector(`label`);
    const spanElement = filterElement.querySelector(`span`);

    filterElement.querySelector(`input`).setAttribute(`id`, `filter__${item.name.toLowerCase()}`);
    labelElement.setAttribute(`for`, `filter__${item.name.toLowerCase()}`);
    labelElement.firstChild.textContent = `${item.name} `;
    labelElement.addEventListener(`click`, function () {
      cardsParentElement.textContent = ``;
      showCards(getRandomNumber());
    });
    spanElement.className = `filter__${item.name.toLowerCase()}-count`;
    spanElement.textContent = getRandomNumber();
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
