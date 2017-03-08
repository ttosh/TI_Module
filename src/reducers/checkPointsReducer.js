import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkPointsReducer(state = initialState.checkPoints, action) {
  switch (action.type) {
    case types.LOAD_CHECKPOINTS_SUCCESS:
      return action.checkPoints;

    default:
      return state;
  }
}

