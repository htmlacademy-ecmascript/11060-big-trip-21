import {render, replace} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';

export default class BoardPresenter {
  #eventsListComponent = new EventsListView();

  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointEditClickHandler = () => {
      replacePointToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const formSubmitHandler = () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointEditFormClickHandler = () => {
      replaceEditToPoint();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const pointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: pointEditClickHandler
    });

    const pointEditComponent = new PointEditView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onFormSubmit: formSubmitHandler,
      onEditClick: pointEditFormClickHandler
    });

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventsListComponent.element);
  }

  #renderBoard() {
    render(new SortView(), this.#container);
    render(this.#eventsListComponent, this.#container);

    if (!this.#points.length) {
      render(new NoPointView(), this.#eventsListComponent.element);
      return;
    }

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}

