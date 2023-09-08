import {RenderPosition, render, replace, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/utils.js';
import { SortType, enabledSortType } from '../const.js';
import { sorts } from '../utils/sort.js';

export default class BoardPresenter {
  #eventsListComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #points = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = sorts[SortType.DAY]([...this.#pointsModel.points]);
  }

  init() {
    this.#renderBoard();
  }

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    this.#currentSortType = sortType;
    this.#points = sorts[this.#currentSortType](this.#points);
  }

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderSort();
    this.#renderPoints();
  };

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    const sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: (type === this.#currentSortType),
      isDisabled: !enabledSortType[type]
    }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#eventsListComponent.element);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    if (!this.#points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderEventsList();
    this.#renderSort();
    this.#renderPoints();
  }
}

