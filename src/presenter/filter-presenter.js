import FiltersView from '../view/filters-view';
import {render, replace, remove} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import { UpdateType } from '../const';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor({container, pointsModel, filterModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    return Object.entries(filter)
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisabled: filterPoints(this.#pointsModel.points).length === 0
      }));
  }

  init () {
    this.#currentFilter = this.#filterModel.get();

    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      items: filters,
      onItemChange: this.#filterTypeChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterTypeChangeHandler = (filterType) => {
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}


