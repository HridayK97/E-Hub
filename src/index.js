import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from "react-router-dom";
import {
  Provider
} from 'react-redux'
import './index.css';
import store from './store';
import history from './history';
import App from './App';
import './assets/css/App.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store = {store}>
     <Router history={history}>
       <Switch>
          <App />
       </Switch>
     </Router>
 </Provider>,
 document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
