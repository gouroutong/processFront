import {Icon, Layout, Menu} from 'antd';
import React from "react";

const {Header, Content, Footer, Sider} = Layout;

const ProcessLayout = props => {
  const {children} = props;
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          background: "#ffffff",
          marginTop: '5px'
        }}
      >
        <Menu mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="appstore-o"/>
            <span className="nav-text">表单管理</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera"/>
            <span className="nav-text">流程管理</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart"/>
            <span className="nav-text">我的申请</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o"/>
            <span className="nav-text">待办事项</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="user"/>
            <span className="nav-text">个人信息</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{margin: "5px"}}>
        <Content style={{overflow: 'initial', background: '#ffffff'}}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default ProcessLayout
