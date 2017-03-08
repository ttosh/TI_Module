import * as types from './actionTypes';
import TicketsApi from '../api/objects/ticket';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function createUpdateTicketSuccess(ticket) {
  return {type: types.CREATE_UPDATE_TICKET_SUCCESS, ticket};
}


export function loadTicketsSuccess(tickets) {
  return {type: types.LOAD_TICKETS_SUCCESS, tickets};
}

export function loadTickets(jobId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return TicketsApi.loadTickets(jobId).then(tickets => {
      dispatch(loadTicketsSuccess(tickets));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveTicket(ticket) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TicketsApi.save(ticket).then(ticket => {
      dispatch(createUpdateTicketSuccess(ticket));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

