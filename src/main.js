import {getRandomNumber} from './utils';
import renderFilter from './filter';
import {getTaskData} from './mocks';
import {Task} from './task';
import {TaskEdit} from './task-edit';

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

const renderTask = function (data) {
  const taskComponent = new Task(data);
  cardsParentElement.appendChild(taskComponent.render());
  const editTaskComponent = new TaskEdit(data);

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    cardsParentElement.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    cardsParentElement.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

  editTaskComponent.onEdit = () => {
    taskComponent.render();
    cardsParentElement.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

  editTaskComponent.onDelete = () => {
    cardsParentElement.removeChild(editTaskComponent.element);
    editTaskComponent.unrender();
  };
};

const showTasks = function (cardsQuantity) {
  for (let i = 1; i <= cardsQuantity; i++) {
    renderTask(getTaskData());
  }
};

showFilters();
showTasks(TEMPLATE_CARDS_QUANTITY);
