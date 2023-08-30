import { getRandomInteger, getRandomBoolean, getRandomArrayElement } from '../utils/utils.js';
import { Price, DATES_FROM, DATES_TO } from '../const.js';

function generatePoint(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getRandomArrayElement(DATES_FROM),
    dateTo: getRandomArrayElement(DATES_TO),
    destination: destinationId,
    isFavorite: getRandomBoolean(),
    offers: offerIds,
    type
  };
}

export { generatePoint };
