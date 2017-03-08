import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ticketsReducer(state = initialState.tickets, action) {
  switch (action.type) {
    case types.LOAD_TICKETS_SUCCESS:
      return action.tickets;

    default:
      return state;
  }
}

