import React from 'react';
import {Col, Row} from 'antd';

const defaultLayout = {
  labelCol: {
    xs: 4,
  },
  wrapperCol: {
    xs: 15,
  },
};

class LineLayout extends React.Component {
  render() {
    const {labelCol, wrapperCol, label, children, style} = this.props;
    return (
      <Row>
        <Col {...labelCol} style={{
          textAlign: 'right',
          marginRight: 10
        }}>{label}</Col>
        <Col {...wrapperCol}>{children}</Col>
      </Row>
    );
  }
}

LineLayout.defaultProps = {
  labelCol: defaultLayout.labelCol,
  wrapperCol: defaultLayout.wrapperCol,
  style: {},
};

export default LineLayout;

