import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ticketCheckPointTypeReducer(state = initialState.ticketCheckPointTypes, action) {
  switch (action.type) {
    case types.LOAD_TICKET_CHECKPOINT_TYPES__SUCCESS:
      return action.ticketCheckPointTypes;

    default:
      return state;
  }
}

