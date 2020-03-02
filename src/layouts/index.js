import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import history from '@/layouts/history';
import {connect, Provider} from 'react-redux';
import User from '@/layouts/page/user';
import store from '@/layouts/store';
import Process from "./page/process/";

class XProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/user" component={User}/>
            <Route path="/" component={Process}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default XProcess;
