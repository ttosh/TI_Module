import * as types from './actionTypes';
import StandardItemApi from '../api/objects/standardItem';
import StandardItemMockApi from '../api/objects/standardItem';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadStandardItemsSuccess(standardItems) {
  return {type: types.LOAD_STANDARD_ITEMS__SUCCESS, standardItems};
}

export function createUpdateStandardItemSuccess(standardItem) {
  return {type: types.CREATE_UPDATE_STANDARD_ITEM_SUCCESS, standardItem};
}


export function loadStandardItems(fiscalYearId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return StandardItemMockApi.loadStandardItems(fiscalYearId).then(standardItems => {
      dispatch(loadStandardItemsSuccess(standardItems));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveStandardItem(standardItem) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return StandardItemApi.save(standardItem).then(standardItem => {
      dispatch(createUpdateStandardItemSuccess(standardItem));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


