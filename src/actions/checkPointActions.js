import * as types from './actionTypes';
import CheckPointApi from '../api/objects/checkPoint';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadCheckPointSuccess(checkPoints) {
  return {type: types.LOAD_CHECKPOINTS_SUCCESS, checkPoints};
}

export function createUpdateCheckPointSuccess(checkPoint) {
  return {type: types.CREATE_UPDATE_CHECKPOINT_SUCCESS, checkPoint};
}

export function loadCheckPoints(ticketId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return CheckPointApi.loadCheckPoints(ticketId).then(checkPoints => {
      dispatch(loadCheckPointSuccess(checkPoints));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCheckPoint(checkPoint) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return CheckPointApi.save(checkPoint).then(checkPoint => {
      dispatch(createUpdateCheckPointSuccess(checkPoint));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
