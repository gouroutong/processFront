import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Header from '../components/Header';
import {connect, Provider} from 'react-redux';

export default class Process extends React.Component {
  render() {
    return (<div style={{display: 'flex', flex: 1, flexFlow: 'column', overflow: 'auto'}}>
      <Header/>
      <Switch>
        <Route path="/home" component={()=><div>1111111</div>}/>
      </Switch>
    </div>)
  }
}


