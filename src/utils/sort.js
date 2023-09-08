import { SortType } from '../const.js';
import dayjs from 'dayjs';

function sortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function sortByDay(a, b) {
  return dayjs(b.dateFrom).diff(dayjs(a.dateFrom));
}

function sortByTimeDuration(a, b) {
  const durationA = dayjs(a.dateTo).diff(a.dateFrom);
  const durationB = dayjs(b.dateTo).diff(b.dateFrom);
  return durationB - durationA;
}

const sorts = {
  [SortType.DAY]: (points) => [...points].sort(sortByDay),
  [SortType.EVENT]: (points) => [...points],
  [SortType.TIME]: (points) => [...points].sort(sortByTimeDuration),
  [SortType.PRICE]: (points) => [...points].sort(sortByPrice),
  [SortType.OFFER]: (points) => [...points]
};

export { sorts, sortByPrice, sortByDay, sortByTimeDuration };
