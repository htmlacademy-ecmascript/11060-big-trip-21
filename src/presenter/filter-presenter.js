import FiltersView from '../view/filters-view';
import {render} from '../framework/render.js';
import {filter} from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#filters = Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(this.#pointsModel.points).length,
      }),
    );
  }

  init () {
    render(new FiltersView(this.#filters), this.#container);
  }
}


