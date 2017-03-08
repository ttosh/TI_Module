/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadFiscalYears} from './actions/fiscalYearActions';
import {loadJobs} from './actions/jobActions';
import {loadStandardItems} from './actions/standardItemActions';
import {loadTickets} from './actions/ticketActions';
import {loadCheckPoints} from './actions/checkPointActions';
import {loadCheckPointResults} from './actions/checkPointResultActions';
import {loadShopSubs} from './actions/shopSubActions';
import {loadTicketCheckPointTypes} from './actions/ticketCheckPointTypeActions';
import {loadStandardItemCheckPointTypes} from './actions/standardItemCheckPointTypeActions';

import './styles/qa.ti.Reset.css';
import './styles/qa.ti.Toastr.css';
import './styles/qa.ti.Ribbon.css';
import './styles/google_roboto.css';
import './styles/qa.ti.Bootstrap.css';
import './styles/qa.ti.BootstrapTheme.css';
import './styles/qa.ti.ReactBootstrapTable.css';
import './styles/qa.ti.ReactSelectize.css';
import './styles/qa.ti.Styles.css';


const store = configureStore();
store.dispatch(loadJobs(0));
store.dispatch(loadFiscalYears());
store.dispatch(loadStandardItems());
store.dispatch(loadTickets());
store.dispatch(loadCheckPoints());
store.dispatch(loadCheckPointResults());
//store.dispatch(loadShopSubs());
//store.dispatch(loadTicketCheckPointTypes());
store.dispatch(loadStandardItemCheckPointTypes());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
