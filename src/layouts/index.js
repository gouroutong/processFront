import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import history from '@/layouts/history';
import {Provider} from 'react-redux';
import store from '@/layouts/store';
import Page from './page'

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
            <Route path="/" component={Page}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default XProcess;
