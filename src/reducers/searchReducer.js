import { searchConstants } from './index.constants';

export const searchReducer = (state = { text: '' }, action) => {
  switch (action.type) {
    case searchConstants.searchQuery:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
