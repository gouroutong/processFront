import {Route, Switch} from 'react-router-dom';
import LoginV2 from '@/layouts/page/user/login/LoginV2';
import React from 'react';
import UserLayout from '@/layouts/page/user/UserLayout';
import Register from '@/layouts/page/user/register/Register';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {match} = this.props;
    return (
      <UserLayout>
        <Switch>
          <Route key="login" path={`${match.path}/login`} component={LoginV2}/>
          <Route key="register" path={`${match.path}/register`} component={Register}/>
        </Switch>
      </UserLayout>
    );
  }
}

export default User;
