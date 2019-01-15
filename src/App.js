import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import indexRoutes from './routes/index'
import logo from './logo.svg';
import { Button } from 'antd';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        {indexRoutes.map(route=>{return (<Route path={route.path} component={route.component} />)})}
        </Switch>
      </div>
    );
  }
}

export default App;
