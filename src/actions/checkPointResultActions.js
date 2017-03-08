import * as types from './actionTypes';
import CheckPointResultsApi from '../api/objects/checkPointResult';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadCheckPointResultSuccess(checkPointResults) {
  return {type: types.LOAD_CHECKPOINTRESULTS_SUCCESS, checkPointResults};
}

export function loadCheckPointResults(ticketId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return CheckPointResultsApi.loadCheckPointResults(ticketId).then(checkPointResults => {
      dispatch(loadCheckPointResultSuccess(checkPointResults));
    }).catch(error => {
      throw(error);
    });
  };
}
