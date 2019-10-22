import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Climber from './climber';
import ClimbingRoute from './climbing-route';
import Country from './country';
import Place from './place';
import Card from './card';
import Parking from './parking';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/climber`} component={Climber} />
      <ErrorBoundaryRoute path={`${match.url}/climbing-route`} component={ClimbingRoute} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/place`} component={Place} />
      <ErrorBoundaryRoute path={`${match.url}/card`} component={Card} />
      <ErrorBoundaryRoute path={`${match.url}/parking`} component={Parking} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
