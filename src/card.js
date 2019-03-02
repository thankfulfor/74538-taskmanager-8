import {getTask} from './get-task.js';
import {getRandomNumber} from './utils.js';

const taskData = getTask();

const getColorRadio = () => {
  const getColoredInput = (inputcolor) => {
    return (`<input
        type="radio"
        id="color-${inputcolor}-1"
        class="card__color-input card__color-input--${inputcolor} visually-hidden"
        name="color"
        value="${inputcolor}"
        ${taskData.color === inputcolor ? `checked` : ``}
      />
      <label for="color-${inputcolor}-1" class="card__color card__color--${inputcolor}" >${inputcolor}</label>`);
  };

  const inputColors = [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ];
  return inputColors.map(getColoredInput).join(``);
};

const getHashtags = () => {
  const getRandomTags = () => {
    const randomTagsSet = new Set();
    for (let i = 0; i <= getRandomNumber(3); i++) {
      randomTagsSet.add(Array.from(taskData.tags)[getRandomNumber(taskData.tags.size)]);
    }
    return Array.from(randomTagsSet);
  };
  const randomTags = getRandomTags();
  const getHashtag = (tag) => {
    return (
      `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`);
  };
  return randomTags.map(getHashtag).join(``);
};

const getDueDate = () => {
  return taskData.dueDate.toLocaleDateString(`en-GB`, {
    day: `numeric`,
    month: `long`,
  });
};

const getDueTime = () => {
  return taskData.dueDate.toLocaleString(`en-US`, {
    hour: `numeric`,
    minute: `numeric`,
    hour12: true
  });
};

const getRepeatedDays = () => {
  const getRepeatedDay = (repeatingDay) => {
    const dayInLowerCase = repeatingDay.toLowerCase();
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${dayInLowerCase}-4"
        name="repeat"
        value="${dayInLowerCase}"
        ${taskData.repeatingDays[repeatingDay] ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${dayInLowerCase}-4">${dayInLowerCase}</label>`
    );
  };

  return Object.keys(taskData.repeatingDays).map(getRepeatedDay).join(``);
};

export const renderTask = () => {
  return (
    `<article class="card card--edit card--yellow card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${taskData.title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${getDueDate()}"
                      name="date"
                      value="${getDueDate()}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${getDueTime()}"
                      name="time"
                      value="${getDueTime()}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${getRepeatedDays()}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${getHashtags()}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <label class="card__img-wrap">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${taskData.picture}"
                alt="task picture"
                class="card__img"
              />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${getColorRadio()}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};
