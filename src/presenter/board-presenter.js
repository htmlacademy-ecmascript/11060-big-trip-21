import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import TripEditView from '../view/trip-edit-view.js';
import TripListView from '../view/trip-list-view.js';
import TripView from '../view/trip-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  tripListComponent = new TripListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new TripEditView(), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new TripView(), this.tripListComponent.getElement());
    }
  }
}
