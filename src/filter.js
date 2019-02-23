export default function (checked = false, labelText, count) {
  return (
    `<input
          type="radio"
          id="filter__${labelText}"
          class="filter__input visually-hidden"
          name="filter"
          ${checked ? `checked` : ``}
          ${count === 0 ? `disabled` : ``}
      />
      <label for="filter__${labelText}" class="filter__label"> ${labelText}
        <span class="filter__count filter__all-count">${count}</span>
      </label>`
  );
}
