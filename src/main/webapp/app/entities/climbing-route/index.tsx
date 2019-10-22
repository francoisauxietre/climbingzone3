import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClimbingRoute from './climbing-route';
import ClimbingRouteDetail from './climbing-route-detail';
import ClimbingRouteUpdate from './climbing-route-update';
import ClimbingRouteDeleteDialog from './climbing-route-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClimbingRouteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClimbingRouteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClimbingRouteDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClimbingRoute} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClimbingRouteDeleteDialog} />
  </>
);

export default Routes;
