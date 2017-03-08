﻿import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function jobsReducer(state = initialState.jobs, action) {
  switch (action.type) {
    case types.LOAD_JOBS_SUCCESS:
      return action.jobs;

    default:
      return state;
  }
}

