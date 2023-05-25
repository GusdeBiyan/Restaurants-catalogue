import listRestaurant from '../views/pages/list-restaurant';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': listRestaurant, // default page
  '/list-restaurant': listRestaurant,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
