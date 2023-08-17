import { getRandomInteger, getRandomArrayElement, getRandomBoolean } from '../utils.js';

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

const eventTypes = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant'
};

const offers = {
  [eventTypes.TAXI]: [
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
  [eventTypes.BUS]: [
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
  [eventTypes.TRAIN]: [
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
  [eventTypes.SHIP]: [
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
  [eventTypes.DRIVE]: [
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
  [eventTypes.FLIGHT]: [
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
  [eventTypes.CHECK_IN]: [
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
  [eventTypes.SIGHTSEEING]: [
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
  [eventTypes.RESTAURANT]: [
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

const eventDestinations = {
  GENOVA: 'Genova',
  MILANO: 'Milano',
  TORINO: 'Torino',
  COMO: 'Como'
};

const destinationDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

const photoDesriptions = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const pictures = {
  [eventDestinations.GENOVA]: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    }
  ],
  [eventDestinations.MILANO]: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    }
  ],
  [eventDestinations.TORINO]: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    }
  ],
  [eventDestinations.COMO]: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(photoDesriptions),
    }
  ]
};

const destinations = {
  [eventDestinations.GENOVA]: {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(destinationDescriptions),
    name: 'Genova',
    pictures: pictures[eventDestinations.GENOVA]
  },
  [eventDestinations.MILANO]: {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(destinationDescriptions),
    name: 'Milano',
    pictures: pictures[eventDestinations.MILANO]
  },
  [eventDestinations.TORINO]: {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(destinationDescriptions),
    name: 'Torino',
    pictures: pictures[eventDestinations.TORINO]
  },
  [eventDestinations.COMO]: {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(destinationDescriptions),
    name: 'Como',
    pictures: pictures[eventDestinations.COMO]
  }
};

const BLANK_EVENT = {
  id: crypto.randomUUID(),
  price: 0,
  startTime: new Date(),
  endTime: new Date(),
  destination: [],
  isFavorite: false,
  type: eventTypes.FLIGHT,
  offers: []
};

function getRandomEvent() {
  const randomEventType = getRandomArrayElement(Object.keys(eventTypes));
  const randomEventDestination = getRandomArrayElement(Object.keys(eventDestinations));

  return {
    id: crypto.randomUUID(),
    price: getRandomInteger(),
    startTime: getRandomArrayElement(startDates),
    endTime: getRandomArrayElement(endDates),
    destination: destinations[eventDestinations[randomEventDestination]],
    isFavorite: getRandomBoolean(),
    type: eventTypes[randomEventType],
    offers: offers[eventTypes[randomEventType]]
  };
}

export { getRandomEvent, BLANK_EVENT };

