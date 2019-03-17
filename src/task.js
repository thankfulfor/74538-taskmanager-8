import {Component} from './component';
import {colorCssClassnames} from './mocks';
import moment from 'moment';

export class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
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
    return hashtags.map(getHashtag).join(``);
  }

  get template() {
    return (
      `<article class="card ${colorCssClassnames[this._color]} ${this._isRepeated() ? `card--repeat` : ``}">
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
              <div class="card__date">
                ${moment(this._dueDate).format(`D MMMM`)}
              </div>
              <div class="card__time">
                ${moment(this._dueDate).format(`h:mm`)}
              </div>
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

