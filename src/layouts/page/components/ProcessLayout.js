import {Icon, Layout, Menu} from 'antd';
import React from "react";
import {withRouter} from "umi";

const {Header, Content, Footer, Sider} = Layout;

const ProcessLayout = props => {
  const {children, siderData, history} = props;
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
          {siderData && siderData.map(item => {
            const {label, key, route, icon} = item;
            return (
              <Menu.Item key={key} onClick={() => history.push(route)}>
                <Icon type={icon}></Icon>
                <span className="nav-text">{label}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout style={{margin: "5px"}}>
        <Content style={{overflow: 'initial', background: '#ffffff', display: 'flex', flexFlow: 'column'}}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default withRouter(ProcessLayout)
