import {Layout} from 'antd';
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
