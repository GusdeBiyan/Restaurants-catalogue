// import FavoriteRestoIdb from '../../data/favorite-resto-idb';
// import { createRestoItemTemplate } from '../templates/template-creator';

// const Like = {
//   async render() {
//     return `
//       <div class="content">
//           <h2 tabindex="0" class="label-menu">Your Favorite Restaurant</h2>
//         <div class="posts" id="restos">
//       </div>
//     `;
//   },

//   async afterRender() {
//     const restaurants = await FavoriteRestoIdb.getAllRestos();
//     const restosContainer = document.querySelector('#restos');

//     restaurants.forEach((restaurant) => {
//       restosContainer.innerHTML += createRestoItemTemplate(restaurant);
//     });
//     this._hideHeroContent();
//   },

//   _hideHeroContent() {
//     const removeHero = document.querySelector('.hero');
//     removeHero.style.display = 'none';
//   },
// };

// export default Like;

/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/favorite-resto-idb';
// import { createRestoItemTemplate } from '../templates/template-creator';
import FavoriteRestoSearchView from './liked-restos/favorite-resto-search-view';
import FavoriteRestoShowPresenter from './liked-restos/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './liked-restos/favorite-resto-search-presenter';
import '../../components/skeleton-list';

const view = new FavoriteRestoSearchView();

const Like = {
  async render() {
    return `
      <div class="content">
       <input id="query" type="text">
        <div class="hero-favorite">
              <picture>
                    <source type="image/jpeg" media="(max-width: 600px)" srcset="./images/hero-2-small.jpg" crossorigin="anonymous">
                    <source type="image/jpeg" media="(min-width: 601px)" srcset="./images/hero-2-large.jpg" crossorigin="anonymous">
                    <img src='./images/hero-2.webp' alt="Hero Restaurant Image " crossorigin="anonymous">
             </picture>
         </div>
        <div class ="favorite">
          <h2 tabindex="0" class="label-menu">Your Favorite Restaurant</h2>
          <div class="posts" id="restos">
          </div>    
        </div>
      </div>
    `;
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteRestos: FavoriteRestoIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestoIdb });

    // const restaurants = await FavoriteRestoIdb.getAllRestos();
    // const restosContainer = document.querySelector('#restos');
    // const skeletonElement = document.querySelector('skeleton-list');

    // const hideSkeleton = () => {
    //   skeletonElement.style.display = 'none';
    // };

    // restaurants.forEach((restaurant) => {
    //   restosContainer.innerHTML += createRestoItemTemplate(restaurant);
    // });

    // hideSkeleton();
  },

};

export default Like;
