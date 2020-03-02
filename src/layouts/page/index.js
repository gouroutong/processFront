import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import User from '@/layouts/page/user';
import Process from "./process";

// const testFun = (func) => {
//   const obj = func(store);
//   return (Component) => class extends React.Component {
//     render() {
//       return <Component {...obj} {...this.props} />
//     }
//   }
// }

@connect(({user}) => ({user}))
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.isLogin()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.token != this.props.user.token) {
      this.isLogin();
    }
  }

  isLogin = () => {
    const {user = {}, history, location} = this.props;
    if (user.token) {
      history.push("/");
      return
    }
    if (location.pathname.startsWith("/user")) {
      return;
    }
    history.push("/user/login");
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/user" component={User}/>
          <Route path="/" component={Process}/>
        </Switch>
      </>
    );
  }
}

export default Page;
