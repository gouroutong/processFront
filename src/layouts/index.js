import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import history from '@/layouts/history';
import Header from './page/components/Header';
import {connect, Provider} from 'react-redux';
import User from '@/layouts/page/user';
import store from '@/layouts/store';


class Root extends React.Component {
  componentDidUpdate(prevProps) {

  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch.user.activeUser()
    // }

  }

  render() {
    return (<div style={{display: 'flex', flex: 1, flexFlow: 'column', overflow: 'auto'}}>
      <Header/>
      <Switch>
        <Route path="/home" component={<div>1111111</div>}/>
      </Switch>
    </div>)
  }
}

const RootWrap = connect()(Root)

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
            <Route path="/" component={RootWrap}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default XProcess;
