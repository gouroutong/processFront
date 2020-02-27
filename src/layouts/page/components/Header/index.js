import {Icon, PageHeader} from 'antd';
import React from 'react';
import Avatar from '@/layouts/page/components/Header/Avatar';
import history from '@/layouts/history';

const IconLink = (props) => {
  if (props.component) {
    const Component = props.component;
    return (
      <Component type={props.type} style={{margin: '0 10px'}}/>
    );
  }
  return (
    <Icon type={props.type} style={{margin: '0 10px'}}/>
  );
};
const icons = [
  {
    type: 'user',
    id: 3,
    component: Avatar,
  }
];
const Header = props => <PageHeader
  style={{
    background: '#FFFFFF',
    marginBottom: 5,
    padding: '5px 20px',
  }}
  onBack={history.goBack}
  title={'PROCESS'}
  backIcon={<Icon style={{fontSize: 16}} type="left"/>}

  extra={
    icons.map((icon) => <IconLink {...icon} key={icon.id}/>)
  }
  {...props}
/>;
export default Header;
