import {render, RenderPosition} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import TripBoardPresenter from './presenter/trip-board-presenter.js';
import EventsModel from './model/events-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersElement);

const tripPresenter = new TripBoardPresenter({tripBoardContainer: tripEventsElement, eventsModel});

tripPresenter.init();
