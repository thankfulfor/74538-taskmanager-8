import {getRandomNumber} from './utils';
import renderFilter from './filter';
import {renderTask} from './render-task';
import {getTaskData} from './mocks';

const TEMPLATE_CARDS_QUANTITY = 7;
const MAX_NUMBER = 20;

const filters = [
  {
    checked: true,
    name: `ALL`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `OVERDUE`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `TODAY`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `FAVORITES`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `Repeating`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `Tags`,
    count: getRandomNumber(MAX_NUMBER),
  },
  {
    checked: false,
    name: `ARCHIVE`,
    count: getRandomNumber(MAX_NUMBER),
  }
];

const filtersParentElement = document.querySelector(`.main__filter`);
const cardsParentElement = document.querySelector(`.board__tasks`);

const filterInputChangeHandler = function () {
  cardsParentElement.innerHTML = ``;
  showTasks(getRandomNumber(MAX_NUMBER));
};

const showCardsByClick = function () {
  const filterInputElements = filtersParentElement.querySelectorAll(`.filter__input`);
  for (let i = 0; i < filterInputElements.length; i++) {
    filterInputElements[i].addEventListener(`change`, filterInputChangeHandler);
  }
};

const showFilters = function () {
  let filterList = ``;
  for (let i = 0; i < filters.length; i++) {
    filterList += renderFilter(filters[i].checked, filters[i].name, filters[i].count);
  }
  filtersParentElement.innerHTML = filterList;
  showCardsByClick();
};

const showTasks = function () {
  const getTasks = () => {
    let cards = [];
    for (let i = 1; i <= TEMPLATE_CARDS_QUANTITY; i++) {
      cards.push(renderTask(getTaskData()));
    }
    return cards;
  };
  cardsParentElement.innerHTML = getTasks().join(``);
};

showFilters();
showTasks();
