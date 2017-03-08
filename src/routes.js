import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';

import DashboardPage from './components/controls/pages/DashboardPage';
import StandardItemPage from './components/controls/pages/StandardItemPage';
import BuildPlanPage from './components/controls/pages/BuildPlanPage';
import CheckPointPage from './components/controls/pages/CheckPointPage';
import CheckPointResultPage from './components/controls/pages/CheckPointResultPage';
import FileManagementPage from './components/controls/pages/FileManagementPage';

export default (

  <Route path="/QA/TI/" component={App}>
    <IndexRoute component={DashboardPage} />
    <Route path="Home.aspx" component={DashboardPage} />
    <Route path="StandardItems.aspx" component={StandardItemPage} />
    <Route path="InspectionPlan.aspx" component={BuildPlanPage} />
    <Route path="SetupCheckPoint.aspx" component={CheckPointPage} />
    <Route path="CheckPointResults.aspx" component={CheckPointResultPage} />
    <Route path="FileManagement.aspx" component={FileManagementPage} />
  </Route>
);
