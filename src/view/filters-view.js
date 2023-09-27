import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filters) {
  return `
    ${filters.map((filter) => `
      <div class="trip-filters__filter">
        <input id="filter-${filter.type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.type}" ${filter.isChecked ? 'checked' : ''} ${filter.isDisabled ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
      </div>`).join('')}
  `;
}

function createFiltersTemplate(filters) {
  return `
    <form class="trip-filters" action="#" method="get">
      ${createFilterItemTemplate(filters)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FiltersView extends AbstractView {
  #filters = [];
  #handleFilterTypeChange = null;

  constructor({items, onItemChange}) {
    super();
    this.#filters = items;
    this.#handleFilterTypeChange = onItemChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
