/* eslint-disable max-len */
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestoDbSource {
  static async listResto() {
    const response = await fetch(API_ENDPOINT.RESTO_LIST);
    const responseJson = await response.json();
    return responseJson.restaurants; // result diganti jadi restaurants, disesuaikan sama nama key yang diambil
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default TheRestoDbSource;
