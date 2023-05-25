/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { createRestoItemTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
    <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked resto</h2>
      <div id="resto-search-container">
        <div id="restos" class="restos">
        </div>
      </div>
    </div>

    
  `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestos(restos) {
    let html;
    if (!restos) return;
    if (restos.length > 0) {
      html = restos.reduce(
        (carry, resto) => carry.concat(`<li class="resto"><span class="resto__title">${resto.title || '-'}</span></li>`),
        '',
      );
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.querySelector('.restos').innerHTML = html;

    document.getElementById('resto-search-container')
      .dispatchEvent(new Event('restos:searched:updated'));
  }

  showFavoriteRestos(restos = []) {
    let html;
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }
    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }

  _getEmptyRestoTemplate() {
    return '<div style="display: flex; justify-content: center; align-items: center; height: 100px;" class="resto-item__not__found ">There are no restaurants to display</div>';
  }
}

export default FavoriteRestoSearchView;
