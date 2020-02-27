import {Helmet} from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import {connect} from 'react-redux';
import styles from './UserLayout.less';


const UserLayout = props => {
  const {
    children,
  } = props;

  return (
    <>
      <Helmet>
        <title>login</title>
        <meta name="description" content={'login'}/>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>process</span>
              </Link>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default connect(({settings}) => ({
  ...settings,
}))(UserLayout);
