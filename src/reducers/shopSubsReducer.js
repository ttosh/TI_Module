import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function shopSubsReducer(state = initialState.shopSubs, action) {
  switch (action.type) {
    case types.LOAD_SHOPSUBS_SUCCESS:
      return action.Descriptions;

    default:
      return state;
  }
}

