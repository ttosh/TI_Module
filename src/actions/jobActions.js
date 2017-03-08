import * as types from './actionTypes';
import JobApi from '../api/objects/job';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadJobsSuccess(jobs) {
  return {type: types.LOAD_JOBS_SUCCESS, jobs};
}

export function loadJobs(fiscalYearId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return JobApi.getJobDataForFiscalYear(fiscalYearId).then(jobs => {
      dispatch(loadJobsSuccess(jobs));
    }).catch(error => {
      throw(error);
    });
  };
}
