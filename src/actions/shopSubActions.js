import * as types from './actionTypes';
import ShopSubApi from '../api/objects/shopSub';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';



export function loadShopSubsSuccess(shopSub) {
  return {type: types.LOAD_SHOPSUBS_SUCCESS, shopSub};
}

export function loadShopSubs() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return ShopSubApi.getAllShopSubs().then(shopSub => {
      dispatch(loadShopSubsSuccess(shopSub));
    }).catch(error => {
      throw(error);
    });
  };
}
