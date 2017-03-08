import * as types from './actionTypes';
import FiscalYearApi from '../api/objects/fiscalYear';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadFiscalYearsSuccess(fiscalYears) {
  return {type: types.LOAD_FISCAL_YEARS_SUCCESS, fiscalYears};
}

export function loadFiscalYears() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return FiscalYearApi.loadFiscalYears().then(fiscalYears => {
      dispatch(loadFiscalYearsSuccess(fiscalYears));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
