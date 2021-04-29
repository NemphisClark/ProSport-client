import { codConstants } from './index.constants';

export const CODReducer = (state = false, action) => {
  switch (action.type) {
    case codConstants.COD:
      return action.payload;
    default:
      return state;
  }
};
