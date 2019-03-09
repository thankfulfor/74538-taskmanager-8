export default function (repeatingDays) {
  const getRepeatedDay = (repeatingDay) => {
    const dayInLowerCase = repeatingDay.toLowerCase();
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${dayInLowerCase}-4"
        name="repeat"
        value="${dayInLowerCase}"
        ${repeatingDays[repeatingDay] ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${dayInLowerCase}-4">${dayInLowerCase}</label>`
    );
  };

  return Object.keys(repeatingDays).map(getRepeatedDay).join(``);
}
