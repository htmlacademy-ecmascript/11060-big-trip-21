import FiltersView from '../view/filters-view';
import {generateFilter} from '../mock/filter.js';
import {render} from '../framework/render.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#filters = generateFilter(this.#pointsModel.points);
  }

  init () {
    render(new FiltersView(this.#filters), this.#container);
  }
}


