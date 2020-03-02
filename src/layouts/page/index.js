import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import User from '@/layouts/page/user';
import Header from "./components/Header";
import Home from './home'
// const testFun = (func) => {
//   const obj = func(store);
//   return (Component) => class extends React.Component {
//     render() {
//       return <Component {...obj} {...this.props} />
//     }
//   }
// }
const Process = () => {
  return <div style={{display: 'flex', flex: 1, flexFlow: 'column', overflow: 'auto'}}>
    <Header/>
    <Switch>
      <Route path="/home" component={Home}/>
    </Switch>
  </div>
}

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
      if (location.pathname.startsWith("/user")) {
        history.push("/");
      }
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
