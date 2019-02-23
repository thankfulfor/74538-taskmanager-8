'use strict';

(function () {
  window.renderFilter = function (checked = false, labelText, count) {
    return (
      `<input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          ${checked ? `checked` : ``}
          ${count === 0 ? `disabled` : ``}
      />
      <label for="filter__all" class="filter__label"> ${labelText}
        <span class="filter__count filter__all-count">${count}</span>
      </label>`
    );
  };
})();

