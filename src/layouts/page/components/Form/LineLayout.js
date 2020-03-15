import React from 'react';
import { Col, Row } from 'antd';
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
        const { labelCol, wrapperCol, label, children, style,labelCls } = this.props;
        return (
            <Row style={{ margin: '10px 0' }}>
                <Col
                    {...labelCol}
                    className={labelCls}
                    style={{
                        textAlign: 'right',
                        marginRight: 10,
                    }}
                >
                    {label}
                </Col>
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
