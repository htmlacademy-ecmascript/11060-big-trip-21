const DATE_FORMAT = {
  TIME: 'HH:mm',
  DISPLAY_DATE: 'MMM DD',
  EVENT_DATE: 'YYYY-MM-DD',
  DURATION: 'MM[M] DD[D] HH[H] mm[M]',
  EDIT_DATE: 'DD/MM/YY HH:mm'
};

const DESTINATION_COUNT = 15;
const POINT_COUNT = 5;
const OFFER_COUNT = 5;
const MIN_PICTURES = 0;
const MAX_PICTURES = 5;

const CITIES = ['Tokyo', 'Milano', 'London', 'Los-Angeles', 'Paris', 'Kyiv'];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

const Price = {
  MIN: 1,
  MAX: 1000
};

const DATES_FROM = [
  '2023-04-17T10:00',
  '2023-05-16T11:30',
  '2023-06-14T12:00',
  '2023-07-18T13:30'
];

const DATES_TO = [
  '2023-08-18T14:30',
  '2023-09-19T15:00',
  '2023-10-19T16:30',
  '2023-11-19T17:00'
];

const DEFAULT_TYPE = 'Flight';

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  DATE_FORMAT,
  CITIES,
  DESCRIPTION,
  Price,
  DATES_FROM,
  DATES_TO,
  DESTINATION_COUNT,
  POINT_COUNT,
  OFFER_COUNT,
  TYPES,
  POINT_EMPTY,
  MIN_PICTURES,
  MAX_PICTURES,
  FilterType,
  SortType,
  enabledSortType,
  UserAction,
  UpdateType,
  NoPointsTextType,
};
