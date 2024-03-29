/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
Feature('Liking Restos');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

const assert = require('assert');

Scenario('showing empty liked restos', ({ I }) => {
  I.see('There are no restaurants to display', '.resto-item__not__found');
});

Scenario('liking one movie', async ({ I }) => {
  I.see('There are no restaurants to display', '.resto-item__not__found');
  I.amOnPage('/#/');
  pause();
  I.waitForElement('.see-detail a');
  const firstFilm = locate('.see-detail a').first();
  I.click(firstFilm);

  I.waitForElement('.resto__title');
  const firstFilmTitle = await I.grabTextFrom('.resto__title');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.waitForElement('.resto-item');
  const likedFilmTitle = await I.grabTextFrom('.resto__title');
  assert.strictEqual(firstFilmTitle, likedFilmTitle);
});

Scenario('unliking a restaurant', async ({ I }) => {
  I.see('There are no restaurants to display', '.resto-item__not__found');
  I.amOnPage('/#/');
  pause();
  I.waitForElement('.see-detail a');
  const firstResaurant = locate('.see-detail a').first();
  I.click(firstResaurant);

  I.waitForElement('.resto__title');
  const firstFilmTitle = await I.grabTextFrom('.resto__title');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.waitForElement('.resto-item');
  const likedRestaurantTitle = await I.grabTextFrom('.resto__title');

  assert.strictEqual(firstFilmTitle, likedRestaurantTitle);

  I.click(firstResaurant);
  I.waitForElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');

  I.see('There are no restaurants to display', '.resto-item__not__found');
});
