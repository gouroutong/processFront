import React, {Component} from 'react';

import {connect} from 'react-redux';
import styles from './style.less';
import {Button, Form, Icon, Input} from 'antd';
import history from "../../../history";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch.user.login({
          ...values
        });
      }
    });
  };

  render() {
    const {submitting, form} = this.props;
    const {getFieldDecorator} = form;
    console.log("user",this.props.user)
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={submitting} style={{width: '100%'}} htmlType="submit" className="login-form-button">
              Login
            </Button>
            Or <a onClick={() => history.push("/user/register")}>register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({user,loading}) => ({
  submitting: loading.effects.user.account,
  user
}))(
  Form.create()(LoginForm)
)
