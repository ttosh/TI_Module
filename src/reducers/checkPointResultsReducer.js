import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkPointResultsReducer(state = initialState.checkPointResults, action) {
  switch (action.type) {
    case types.LOAD_CHECKPOINTRESULTS_SUCCESS:
      return action.checkPointResults;

    default:
      return state;
  }
}

