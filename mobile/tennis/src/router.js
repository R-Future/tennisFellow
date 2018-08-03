import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import RankPage from './routes/RankPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/rank" exact component={RankPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
