import React from 'react';
import {Input, Modal} from 'antd';
import {closeModalContainer, createModalContainer, renderReactDOM} from '../../components/Dom';
import {request} from '../../utils/request';
import LineLayout from "../../components/Form/LineLayout";
import U from "../../utils/U";

const id_div = 'rename-modal';


class CreateNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  static open = (props = {}) => {
    renderReactDOM(<CreateNode {...props} />);
  };

  handleConfirm() {
    const {success, id} = this.props;
    const {name} = this.state;
    request("/ipt_data/update_name", {fileName: name, dataId: id}).then(res => {
      success && success();
      closeModalContainer(id_div)
    }).catch((error) => {
      console.log(error);
    })
  }

  handleCancel() {
    closeModalContainer(id_div);
  }


  render() {
    const {title} = this.props;
    const {name} = this.state;
    return (
      <>
        <Modal
          title={title || "重命名"}
          onCancel={this.handleCancel}
          onOk={this.handleConfirm}
          getContainer={() => createModalContainer(id_div)}
          visible={true}
        >
          <LineLayout label="名称:">
            <Input value={name} onChange={e => this.setState({name: U.getValueFromEvent(e)})}/>
          </LineLayout>
        </Modal>
      </>
    );
  }
}

export default CreateNode;
