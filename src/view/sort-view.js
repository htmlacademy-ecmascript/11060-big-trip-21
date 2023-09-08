import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(items) {
  return `
    ${items.map((item) => `
      <div class="trip-sort__item  trip-sort__item--${item.type}">
        <input id="sort-${item.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.type}" ${item.isChecked ? 'checked' : ''} ${item.isDisabled ? 'disabled' : ''} data-sort-type="${item.type}">
        <label class="trip-sort__btn" for="sort-${item.type}">${item.type.toUpperCase()}</label>
      </div>`).join('')}
  `;
}

function createSortTemplate(items) {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemTemplate(items)}
    </form>
  `;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #items = null;

  constructor({items, onSortTypeChange}) {
    super();
    this.#items = items;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#items);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
