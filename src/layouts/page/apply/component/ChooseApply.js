import React from 'react';
import {Col, Modal, Row} from 'antd';
import {closeModalContainer, createModalContainer, renderReactDOM} from '../../components/Dom';
import {request} from "../../utils/request";

const id_div = 'choose-apply-modal';


class ChooseApply extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  static open = (props = {}) => {
    renderReactDOM(<ChooseApply {...props} />);
  };

  handleConfirm() {
    this.handleCancel();
  }

  handleCancel() {
    closeModalContainer(id_div);
  }


  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    request("/process/list", {}).then(processList => {
      this.setState({processList})
    })
  }
  state = {}

  render() {
    const {title, newApply} = this.props;
    const {processList} = this.state;
    return (
      <Modal
        title={title || "发起申请"}
        onCancel={this.handleCancel}
        onOk={this.handleConfirm}
        getContainer={() => createModalContainer(id_div)}
        visible={true}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          {processList && processList.length > 0 && processList.map(process => {
            return <Col key={process.Id} span={6} style={{textAlign: 'center'}}>
              <a onClick={() => {
                this.handleCancel();
                newApply(process.Id)
              }}>{process.Name}</a>
            </Col>
          })}
        </Row>
      </Modal>
    );
  }
}

export default ChooseApply;
