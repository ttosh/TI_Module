import * as types from './actionTypes';
import StandardItemCheckPointTypeApi from '../api/objects/checkPointType';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadStandardItemCheckPointTypesSuccess(standardItemCheckPointTypes) {
  return {type: types.LOAD_STANDARD_ITEM_CHECKPOINT_TYPES__SUCCESS, standardItemCheckPointTypes};
}

export function loadStandardItemCheckPointTypes() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return StandardItemCheckPointTypeApi.getAllStandardItemCheckPointTypes().then(standardItemCheckPointTypes => {
      dispatch(loadStandardItemCheckPointTypesSuccess(standardItemCheckPointTypes));
    }).catch(error => {
      throw(error);
    });
  };
}


