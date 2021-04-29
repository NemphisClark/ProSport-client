import { userConstants } from './index.constants';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case userConstants.loggedInUser:
      return action.payload;
    case userConstants.logOutUser:
      return action.payload;
    default:
      return state;
  }
};
