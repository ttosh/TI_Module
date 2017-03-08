import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function standardItemCheckPointTypeReducer(state = initialState.standardItemCheckPointTypes, action) {
  switch (action.type) {
    case types.LOAD_STANDARD_ITEM_CHECKPOINT_TYPES__SUCCESS:
      return action.standardItemCheckPointTypes;

    default:
      return state;
  }
}

