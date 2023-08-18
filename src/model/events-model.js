import { generateRandomEvent } from '../mock/event.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, generateRandomEvent);

  getEvents() {
    return this.events;
  }
}
