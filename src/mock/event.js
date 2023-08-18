import { getRandomInteger, getRandomArrayElement, getRandomBoolean } from '../utils.js';

let destinationId = 0;

const startDates = [
  '2019-03-18T10:00',
  '2019-03-18T11:30',
  '2019-03-18T12:00',
  '2019-03-18T13:30'
];

const endDates = [
  '2019-03-18T14:30',
  '2019-03-18T15:00',
  '2019-03-18T16:30',
  '2019-03-18T17:00'
];

const eventTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const offers = {
  'Taxi': [
    {
      name: 'Transfer',
      cost: 60,
      checked: true
    },
    {
      name: 'Order Uber',
      cost: 30,
      checked: false
    }
  ],
  'Bus': [
    {
      name: 'Choose seats',
      cost: 130,
      checked: false
    },
    {
      name: 'Extra space',
      cost: 30,
      checked: false
    }
  ],
  'Train': [
    {
      name: 'Buy tickets',
      cost: 260,
      checked: true
    },
    {
      name: 'Add bed sheets',
      cost: 30,
      checked: false
    }
  ],
  'Ship': [
    {
      name: 'Add comfort',
      cost: 130,
      checked: false
    },
    {
      name: 'Extra window',
      cost: 30,
      checked: false
    }
  ],
  'Drive': [
    {
      name: 'Sportcar',
      cost: 460,
      checked: true
    },
    {
      name: 'Add more speed',
      cost: 30,
      checked: false
    }
  ],
  'Flight': [
    {
      name: 'Choose seats',
      cost: 40,
      checked: false
    },
    {
      name: 'Business class',
      cost: 530,
      checked: false
    }
  ],
  'Check-in': [
    {
      name: 'Book tickets',
      cost: 60,
      checked: true
    },
    {
      name: 'Lunch in city',
      cost: 120,
      checked: false
    }
  ],
  'Sightseeing': [
    {
      name: 'Order Uber',
      cost: 40,
      checked: true
    },
    {
      name: 'Lunch in city',
      cost: 50,
      checked: false
    }
  ],
  'Restaurant': [
    {
      name: 'Add meal',
      cost: 10,
      checked: true
    },
    {
      name: 'Extra coffee',
      cost: 30,
      checked: false
    }
  ]
};

const eventDestinations = ['Genova', 'Milano', 'Torino', 'Como'];

const destinationDescriptions = {
  'Genova': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Milano': 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Torino': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Como': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const photoDesriptions = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

const BLANK_EVENT = {
  id: crypto.randomUUID(),
  price: 0,
  startTime: new Date(),
  endTime: new Date(),
  destination: [],
  isFavorite: false,
  type: eventTypes[0],
  offers: []
};

function generatePictures() {
  return {
    src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
    description: getRandomArrayElement(photoDesriptions),
  };
}

function generateDestination() {
  const name = getRandomArrayElement(eventDestinations);

  return {
    id: destinationId++,
    description: destinationDescriptions[name],
    name,
    pictures: Array.from({length: getRandomInteger(0, 5)}, generatePictures),
  };
}

const destinationMocks = Array.from({length: getRandomInteger(5, 10)}, generateDestination);

function generateRandomEvent() {
  const randomEventType = getRandomArrayElement(eventTypes);

  return {
    id: crypto.randomUUID(),
    price: getRandomInteger(),
    startTime: getRandomArrayElement(startDates),
    endTime: getRandomArrayElement(endDates),
    destination: getRandomArrayElement(destinationMocks),
    isFavorite: getRandomBoolean(),
    offers: offers[randomEventType],
    type: randomEventType
  };
}

export { generateRandomEvent, BLANK_EVENT };

