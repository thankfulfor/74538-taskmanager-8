export default function (data) {
  const getColoredInput = (inputcolor) => {
    return (
      `<input
        type="radio"
        id="color-${inputcolor}-1"
        class="card__color-input card__color-input--${inputcolor} visually-hidden"
        name="color"
        value="${inputcolor}"
        ${data.color === inputcolor ? `checked` : ``}
      />
      <label for="color-${inputcolor}-1" class="card__color card__color--${inputcolor}" >${inputcolor}</label>`
    );
  };

  const inputColors = [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ];

  return inputColors.map(getColoredInput).join(``);
}
