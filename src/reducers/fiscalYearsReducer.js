import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fiscalYearsReducer(state = initialState.fiscalYears, action) {
  switch (action.type) {
    case types.LOAD_FISCAL_YEARS_SUCCESS:
      return action.fiscalYears;

    default:
      return state;
  }
}

