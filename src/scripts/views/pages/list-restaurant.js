import TheRestoDbSource from '../../data/therestodb-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const listRestaurant = {
  async render() {
    return `
       <div class="content">
        <div class="hero">
              <picture>
                    <source type="image/jpeg" media="(max-width: 600px)" srcset="./images/hero-small.jpg" crossorigin="anonymous">
                    <source type="image/jpeg" media="(min-width: 601px)" srcset="./images/hero-large.jpg" crossorigin="anonymous">
                    <img src='./images/hero.webp' alt="Hero Restaurant Image " crossorigin="anonymous">
             </picture>
          <div class="hero__inner">
            <h1 class="hero__title">Explore restaurants with us</h1>
            <p class="hero__tagline">We provide various kinds of restaurant references, from traditional to modern, and your
              satisfaction is our right.</p>
          </div>
        </div>
        <div class="daftar-resto">
          <h2 tabindex="0" class="label-menu">List Restaurant</h2>
          <p tabindex="-1" class="label-menu">find your favorite restaurant</p>
          <div class="posts" id="restoran-list">
          </div>
          <skeleton-list></skeleton-list>
        </div>
      </div>
       
    `;
  },

  async afterRender() {
    const Restos = await TheRestoDbSource.listResto();
    const RestosContainer = document.querySelector('#restoran-list');
    const skeletonElement = document.querySelector('skeleton-list');
    const hideSkeleton = () => {
      skeletonElement.style.display = 'none';
    };

    Restos.forEach((Resto) => {
      RestosContainer.innerHTML += createRestoItemTemplate(Resto);
    });

    hideSkeleton();
  },

};

export default listRestaurant;
