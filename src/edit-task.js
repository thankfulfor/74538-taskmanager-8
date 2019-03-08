import {createElement} from './utils';
import getColor from './render-color';
import getDays from './render-days';
import getHashtags from './render-hashtags';

export class TaskEdit {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._getColor = getColor;
    this._getDays = getDays;
    this._getHashtags = getHashtags;
    this._repeatingDays = data.repeatingDays;

    this._onSubmit = null;
    this._element = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _getDueDate() {
    return this._dueDate.toLocaleDateString(`en-GB`, {
      day: `numeric`,
      month: `long`,
    });
  };

  _getDueTime() {
    return this._dueDate.toLocaleString(`en-US`, {
      hour: `numeric`,
      minute: `numeric`,
      hour12: true
    });
  };

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _isRepeated() {
    return Object.values(this._repeatingDays)
      .some((dayOfWeek) => dayOfWeek === true);
  }

  get template() {
    return (
      `<article class="card card--edit card--yellow ${this._isRepeated() ? `card--repeat` : ``}">
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
                >${this._title}</textarea>
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
                      placeholder="${this._getDueDate()}"
                      name="date"
                      value="${this._getDueDate()}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${this._getDueTime()}"
                      name="time"
                      value="${this._getDueTime()}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${this._getDays(this._repeatingDays)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._getHashtags(this._tags)}
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
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${this._getColor(this._color)}
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
  }

  bind() {
    this._element.querySelector(`.card__save`)
      .addEventListener(`click`, this._onSubmitButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__save`)
      .removeEventListener(`click`, this._onSubmitButtonClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

