import { getRandomArrayElement, getRandomInteger } from '../utils/utils.js';
import { CITIES, DESCRIPTION, MIN_PICTURES, MAX_PICTURES } from '../const.js';

function generatePictures(city) {
  return {
    'src': `https://loremflickr.com/200/152?random=${crypto.randomUUID()}`,
    'description': `${city} description`,
  };
}

function generateDestination() {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomArrayElement(DESCRIPTION),
    pictures: Array.from({length: getRandomInteger(MIN_PICTURES, MAX_PICTURES)}, () => generatePictures(city)),
  };
}

export { generateDestination };
