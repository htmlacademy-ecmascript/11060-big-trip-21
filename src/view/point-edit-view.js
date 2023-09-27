import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { CITIES, DATE_FORMAT, POINT_EMPTY, TYPES } from '../const.js';
import { getDestinationByCity, getDestinationById, getOffersByType } from '../utils/utils.js';
import { humanizeDate, replaceTitle, capitalizeFirstLetter } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createEventTypeInputTemplate(types) {
  return `
    ${types.map((type) => `
      <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`).join('')}
  `;
}

function createOffersTemplate(point, offers) {
  if (offers.length === 0) {
    return '';
  }

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox
              visually-hidden"
              id="event-offer-${replaceTitle(offer.title)}-${offer.id}"
              type="checkbox"
              data-id="${offer.id}"
              name="event-${replaceTitle(offer.title)}"

              ${(point.offers.includes(offer.id)) ? 'checked' : ''}
            >
            <label
              class="event__offer-label"
              for="event-offer-${replaceTitle(offer.title)}-${offer.id}"
            >
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('')}
      </div>
    </section>
  `;
}

function createDestinationTemplate(pointDestination) {
  if (!pointDestination || !pointDestination.description && !pointDestination.pictures.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>

      <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pointDestination.pictures.map((photo) =>`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
      </div>
    </div>
    </section>
  `;
}

function createPointEditTemplate({point, pointDestination, pointOffers}) {
  const {type, basePrice, dateFrom, dateTo} = point;
  const name = pointDestination ? pointDestination.name : '';
  const startEventTime = dateFrom ? humanizeDate(dateFrom, DATE_FORMAT.EDIT_DATE) : '';
  const endEventTime = dateTo ? humanizeDate(dateTo, DATE_FORMAT.EDIT_DATE) : '';
  const destinationTemplate = createDestinationTemplate(pointDestination);
  const offersTemplate = createOffersTemplate(point, pointOffers);
  const deleteButtonType = dateFrom ? 'Delete' : 'Cancel';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeInputTemplate(TYPES)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startEventTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endEventTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${deleteButtonType}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${offersTemplate}
        ${destinationTemplate}
        </section>
      </form>
    </li>
  `;
}

export default class PointEditView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #handleEditClick = null;
  #handleDeleteClick = null;
  #handleFormSubmit = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onEditClick, onDeleteClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestination: getDestinationById(this.#pointDestinations, this._state.destination),
      pointOffers: getOffersByType(this.#pointOffers, this._state.type)
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    if(this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: capitalizeFirstLetter(evt.target.value),
      offers: getOffersByType(this.#pointOffers, capitalizeFirstLetter(evt.target.value))
    });
  };

  #offersChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      offers: checkedBoxes.map((element) => element.dataset.id)
    });
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!this.element.querySelector('#event-start-time-1').value) {
      this._setState({
        dateFrom: new Date()
      });
    }

    if (!this.element.querySelector('#event-end-time-1').value) {
      this._setState({
        dateTo: new Date()
      });
    }

    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #priceChangeHandler = (evt) => {
    if (evt.target.value >= 0) {
      this._setState({
        basePrice: evt.target.value
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: getDestinationByCity(this.#pointDestinations, evt.target.value)
    });
  };

  #dateFromCloseHandler = (date) => {
    this._setState({
      dateFrom: date
    });
    this.#setDateFromPicker('maxDate', this._state.dateTo);
  };

  #dateToCloseHandler = (date) => {
    this._setState({
      dateTo: date
    });
    this.#setDateToPicker('minDate', this._state.dateFrom);
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        //dateFormat: 'd/m/y H:i',
        altInput: true,
        altFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      },
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        //dateFormat: 'd/m/y H:i',
        altInput: true,
        altFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      },
    );
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
