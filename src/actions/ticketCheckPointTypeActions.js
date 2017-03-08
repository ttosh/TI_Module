import * as types from './actionTypes';
import TicketCheckPointTypeApi from '../api/objects/checkPointType';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTicketCheckPointTypesSuccess(tcpt) {
  return {type: types.LOAD_TICKET_CHECKPOINT_TYPES__SUCCESS, tcpt};
}

export function loadTicketCheckPointTypes() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return TicketCheckPointTypeApi.getAllTicketCheckPointTypes().then(ticpt => {
      dispatch(loadTicketCheckPointTypesSuccess(ticpt));
    }).catch(error => {
      throw(error);
    });
  };
}


