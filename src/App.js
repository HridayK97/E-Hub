/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import indexRoutes from './routes/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {indexRoutes.map((route, key) => {
            if (route.redirect) return <Redirect from={route.path} to={route.pathTo} key={key} />;

            return <Route path={route.path} component={route.component} />;
          })}
        </Switch>
      </div>
    );
  }
}

export default App;
