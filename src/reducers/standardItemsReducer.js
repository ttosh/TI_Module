import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function standardItemsReducer(state = initialState.standardItems, action) {
  switch (action.type) {
    case types.LOAD_STANDARD_ITEMS__SUCCESS:
      return action.standardItems;

    default:
      return state;
  }
}

