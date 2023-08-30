import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min = 1, max = 1000) {
  return Math.round(min + Math.random() * (max - min));
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

const shuffleArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }

  return elements;
};

function getDuration(date1, date2) {
  const diff = Math.abs(dayjs(date2).diff(date1));
  const fullFormatted = dayjs.duration(diff).format('MM[M] DD[D] HH[H] mm[M]');

  const splittedTime = fullFormatted.split(' ');

  if (splittedTime[0] === '00M' && splittedTime[1] === '00D' && splittedTime[2] === '00H') {
    return dayjs.duration(diff).format('mm[M]');
  }

  if (splittedTime[0] === '00M' && splittedTime[1] === '00D') {
    return dayjs.duration(diff).format('HH[H] mm[M]');
  }

  if (splittedTime[2] === '00M') {
    return dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
  }

  return fullFormatted;
}

function humanizeDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function isChecked(check) {
  return check ? 'checked' : '';
}

export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  getDuration,
  shuffleArray,
  humanizeDate,
  isChecked
};
