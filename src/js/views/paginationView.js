import icons from 'url:../../img/icons.svg'; //Parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateButton(position, action, operation) {
    let buttonText;
    if (operation === '+') {
      buttonText = `${this._data.page + 1}`;
    } else if (operation === '-') {
      buttonText = `${this._data.page - 1}`;
    } else {
      // Default to addition if operation is not specified or invalid
      buttonText = `${this._data.page + 1}`;
    }
    return `
    <button data-goto="${buttonText}" class="btn--inline pagination__btn--${action}">
    <span>Page ${buttonText}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${position}"></use>
    </svg>
  </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButton('right', 'next', '+');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButton('left', 'prev', '-');
    }
    // Other page
    if (curPage < numPages) {
      return [
        this._generateButton('left', 'prev', '-'),
        this._generateButton('right', 'next', '+'),
        ,
      ];
    }
    // Page 1, and there are NO other pages

    return '';
  }
}

export default new PaginationView();
