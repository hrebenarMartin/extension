import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Filters from './Filters';
import Menu from './Menu';
import Error from '../Error';

export default ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={Menu} />
    <Route path={`${match.url}/filters`} component={Filters} />
    <Route component={Error} />
  </Switch>
);
