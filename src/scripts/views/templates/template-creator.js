import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (restaurant) => `
  <h2 tabindex="0" class="resto__title">${restaurant.name}</h2>
  <img class="resto__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous" />
  <div  class="resto__info">
    <h3>Information</h3>
    <h4 tabindex="0">City</h4>
    <p tabindex="0">${restaurant.city}</p>
    <h4 tabindex="0">Location</h4>
    <p tabindex="0">${restaurant.address}</p>
    <h4 tabindex="0">Rating</h4>
    <p tabindex="0">${restaurant.rating}</p>
    <h4 tabindex="0">Categories</h4>
    <p tabindex="0">${restaurant.categories.map((categorie) => `${categorie.name}`).join(' , ')}</p>
  </div>
  <div class="resto__overview">
    <h3 tabindex="0">Description</h3>
    <p class ="deskripsi" tabindex="0">${restaurant.description}</p>
    <h3 tabindex="0">Menu</h3>
    <h4 tabindex="0">Foods</h4>
    <p class="menu-resto" tabindex="0">${restaurant.menus.foods.map((food) => `${food.name}`).join(' , ')}</p>
    <h4 tabindex="0">Drinks</h4>
    <p class="menu-resto" tabindex="0">${restaurant.menus.drinks.map((drink) => `${drink.name}`).join(' , ')}</p>
  </div>
  
`;

const createRestoReviewTemplate = (restaurant) => `
   
    <h2 tabindex="0" class="label-costumer-review">Costumer Reviews</h2>
    <div class="reviews">
          ${restaurant.customerReviews.map((review) => `
            <div class="review-item">
              <b tabindex="0">${review.name}</b>
              <p >${review.date}</p>
              <p tabindex="0">"${review.review}"</p>
            </div>
            `).join('')}
    </div>
    `;

const createRestoItemTemplate = (restaurants) => `
  <div class="card resto-item">
        <div class="card-header">
            <img class="post-item__thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurants.pictureId}"
                alt="${restaurants.name}" crossorigin="anonymous">
            <h4  class="city">${restaurants.city}</h4>
            <p  title="rating restaurants" class="rating">${restaurants.rating}<i class="fa">⭐️</i></p>
         </div>
         <div class="card-content">
                 <h3 tabindex="0" class="card-title resto__title">${restaurants.name}</h3>
                 <div class="description">
                    <p class="text-deksripsi" >${restaurants.description}</p>
                 </div>
                 <h4 class="see-detail"><a href="/#/detail/${restaurants.id}">See details</a></h4>
         </div>
  </div>
`;

const createLikeRestoButtonTemplate = () => `
  <button tabindex="0" aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button tabindex="0" aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createRestoReviewTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
