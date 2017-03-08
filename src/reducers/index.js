import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import fiscalYears from './fiscalYearsReducer';
import jobs from './jobsReducer';
import standardItems from './standardItemsReducer';
import tickets from './ticketsReducer';
import shopSubs from './shopSubsReducer';
import checkPoints from './checkPointsReducer';
import checkPointResults from './checkPointResultsReducer';
import ticketCheckPointTypes from './ticketCheckPointTypeReducer';
import standardItemCheckPointTypes from './standardItemCheckPointTypeReducer';

const rootReducer = combineReducers({
  fiscalYears,
  jobs,
  standardItems,
  tickets,
  shopSubs,
  checkPoints,
  checkPointResults,
  ajaxCallsInProgress,
  ticketCheckPointTypes,
  standardItemCheckPointTypes
});

export default rootReducer;
