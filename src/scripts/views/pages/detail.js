/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import TheRestoDbSource from '../../data/therestodb-source';
import UrlParser from '../../routes/url-parser';
import { createRestoDetailTemplate, createRestoReviewTemplate } from '../templates/template-creator';
import CONFIG from '../../globals/config';
import LikeButtonPresenter from '../../utils/like-button-presenter';

import '../../components/skeleton-detail';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
    <div class="content">
        <div class="hero-favorite">
              <picture>
                    <source type="image/jpeg" media="(max-width: 600px)" srcset="./images/hero-2.jpg" crossorigin="anonymous">
                    <source type="image/jpeg" media="(min-width: 601px)" srcset="./images/hero-2.jpg" crossorigin="anonymous">
                    <img src='./images/hero-2.webp' alt="Hero Restaurant Image " crossorigin="anonymous">
             </picture>
         </div>
         <div class="detail-container">
           <h2 tabindex="0" class="label-menu">Detail Restaurant</h2>
           <skeleton-detail></skeleton-detail>
           <div id="resto" class="resto">
           </div>

         </div>
        </div>
        <div id="likeButtonContainer"></div>
        <div class="addReview">
        <div class="user-review">
        <h2 tabindex="0" class="label-menu">Add Review</h2>
            <form id="form-review">
             <div class="grup">
               <label for="userName" class="label-review">Name</label>
               <input type="text" id="userName" placeholder=" Input Your name" required>
             </div>
             <div class="grup">
               <label for="userReview" class="label-review">Review</label>
               <input type="text" id="userReview" placeholder=" Input Your review" required>
              </div>
               <button id="submitButton" class="btn-addreview" type="submit">Submit</button>
            </form>
           </div>
        </div>
        <div id="review" class="review">
        </div>
    </div>
       
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const RestoContainer = document.querySelector('#resto');
    const ReviewContainer = document.querySelector('#review');

    const skeletonElement = document.querySelector('skeleton-detail');
    const hideSkeleton = () => {
      skeletonElement.style.display = 'none';
    };

    const resto = await TheRestoDbSource.detailResto(url.id);
    if (resto) {
      RestoContainer.innerHTML = createRestoDetailTemplate(resto);
    } else {
      RestoContainer.innerHTML = '<h2 tabindex="0"> FAILED LOAD DATA !!!</h2>';
      RestoContainer.style.display = 'none';
    }

    RestoContainer.innerHTML = createRestoDetailTemplate(resto);
    ReviewContainer.innerHTML = createRestoReviewTemplate(resto);

    hideSkeleton();

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestos: FavoriteRestoIdb,
      resto,
    });

    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const userName = document.querySelector('#userName').value;
      const userReview = document.querySelector('#userReview').value;
      const customerReview = document.createElement('div');
      const containerReview = document.querySelector('.reviews');

      if (userName === '' || userReview === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all the required fields.',
        });
      } else {
        fetch(CONFIG.BASE_URL_REVIEW, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: resto.id,
            name: userName,
            review: userReview,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            customerReview.classList.add('review-item');
            customerReview.innerHTML += `
            <b>${userName}</b>
            <p>${new Date().toDateString()}</p>
            <p>${userReview}</p>
          `;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Review submitted successfully.',
            });
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to submit the review. Check your internet connection',
            });
          });

        containerReview.appendChild(customerReview);
      }
    });
  },

};

export default Detail;
