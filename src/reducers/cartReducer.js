import { cartConstants } from './index.constants';

let initialState = [];

// load cart items from local storage. It will use in back-end. All reducers will in index.js reducer.
// Then push to redux store by index.js (root file). And after this steps It will use in back-end

// Get { cart } from localstorage. We use this data it back-end
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'));
  } else {
    initialState = [];
  }
}

// Self cartReducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.addToCart:
      return action.payload;
    default:
      return state;
  }
};
