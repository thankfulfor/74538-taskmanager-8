import {Component} from './component';

export class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);

    this._getDueDate = function () {
      return this._dueDate.toLocaleDateString(`en-GB`, {
        day: `numeric`,
        month: `long`,
      });
    };

    this._getDueTime = function () {
      return this._dueDate.toLocaleString(`en-US`, {
        hour: `numeric`,
        minute: `numeric`,
        hour12: true
      });
    };
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _isRepeated() {
    return Object.values(this._repeatingDays)
      .some((dayOfWeek) => dayOfWeek === true);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _getHashTags() {
    const hashtags = Array.from(this._tags);
    const getHashtag = (tag) => {
      return (
        `<span class="card__hashtag-inner">
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
      </span>`);
    };
    return hashtags.map(getHashtag)
      .join(``);
  }

  get template() {
    return (
      `<article class="card card--yellow ${this._isRepeated() ? `card--repeat` : ``}">
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
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._getHashTags()}
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
              <img
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>
          </div>
        </div>
      </form>
    </article>`
    );
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

}

