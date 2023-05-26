/* eslint-disable no-undef */
Feature('Reviewing Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/');
  I.waitForElement('.see-detail a');
  I.seeElement('.see-detail a');
  const firstResaurant = locate('.see-detail a').first();
  I.click(firstResaurant);
});

Scenario('Add a review restaurants fill empty', ({ I }) => {
  I.waitForElement('#form-review');

  I.seeElement('#userName');
  I.fillField('#userName', '');

  I.seeElement('#userReview');
  I.fillField('#userReview', '');

  I.seeElement('#submitButton');
  I.click('#submitButton');

  I.waitForElement('.swal2-title', 10);
  I.see('Oops', '.swal2-title');
});

Scenario('Add a review restaurants fill not empty', ({ I }) => {
  I.waitForElement('#form-review');

  I.seeElement('#userName');
  I.fillField('#userName', 'Gusde');

  I.seeElement('#userReview');
  I.fillField('#userReview', 'mantappppp');

  I.seeElement('#submitButton');
  I.click('#submitButton');

  I.waitForElement('.swal2-title', 10);
  I.see('Success', '.swal2-title');
});
