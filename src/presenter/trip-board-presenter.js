import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';

export default class TripBoardPresenter {
  eventsListComponent = new EventsListView();

  constructor({tripBoardContainer, eventsModel}) {
    this.tripBoardContainer = tripBoardContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getEvents()];

    render(new SortView(), this.tripBoardContainer);
    render(this.eventsListComponent, this.tripBoardContainer);
    render(new EditEventView({event: this.boardEvents[0]}), this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < this.boardEvents.length; i++) {
      render(new EventView({event: this.boardEvents[i]}), this.eventsListComponent.getElement());
    }
  }
}
