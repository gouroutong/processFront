import {Icon, Menu} from 'antd';

import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {connect} from 'react-redux';


const Avatar = props => {
  const {style, dispatch} = props;
  const menus = [
    {
      id: 1,
      name: "logout",
      onClick: () => dispatch.user.updateUser({})
    },
  ];
  const langMenu = (
    <Menu className={styles.menu}>
      {menus.map(({id, name, onClick}) => (
        <Menu.Item key={id} onClick={onClick}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <Icon type="user" style={style}/>
    </HeaderDropdown>
  );
};

export default connect()(Avatar);
