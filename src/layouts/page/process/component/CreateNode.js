import React from 'react';
import {Input, Modal,Button} from 'antd';
import {closeModalContainer, createModalContainer, renderReactDOM} from '../../components/Dom';
import {request} from '../../utils/request';
import LineLayout from "../../components/Form/LineLayout";
import U from "../../utils/U";

const id_div = 'rename-modal';


class CreateNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      approvers:["A","B"],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  static open = (props = {}) => {
    renderReactDOM(<CreateNode {...props} />);
  };

  handleConfirm() {
    // const {success, id} = this.props;
    // const {name} = this.state;
    // request("/ipt_data/update_name", {fileName: name, dataId: id}).then(res => {
    //   success && success();
    //   closeModalContainer(id_div)
    // }).catch((error) => {
    //   console.log(error);
    // })
    alert("ok")
  }

  handleCancel() {
    closeModalContainer(id_div);
  }

  addApprover(){
    
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
          <LineLayout label="流程名称:">
            <Input value={name} onChange={e => this.setState({name: U.getValueFromEvent(e)})}/>
          </LineLayout>
          {this.state.approvers.map((item)=> <LineLayout label="第1位审批人:">
            <Input value={name} onChange={e => this.setState({name: U.getValueFromEvent(e)})}/>
          </LineLayout>)}
         
          <Button >添加审批人</Button>
        </Modal>
      </>
    );
  }
}

export default CreateNode;
