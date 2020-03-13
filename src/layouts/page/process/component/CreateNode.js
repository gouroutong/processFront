import React from 'react';
import {Input, Modal, Select} from 'antd';
import {closeModalContainer, createModalContainer, renderReactDOM} from '../../components/Dom';
import LineLayout from "../../components/Form/LineLayout";
import U from "../../utils/U";
import {request} from "../../utils/request";

const id_div = 'rename-modal';


class CreateNode extends React.Component {
  constructor(props) {
    super(props);
    const {name, act, userId, formId} = this.props;
    this.state = {
      name,
      act,
      userId,
      formId
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  static open = (props = {}) => {
    renderReactDOM(<CreateNode {...props} />);
  };

  handleConfirm() {
    const {onChange} = this.props;
    const {act, name, userId, userList, formId, formList} = this.state;
    const data = {act, name};
    if (userId) {
      data.username = userList.find(user => user.Id == userId).username;
      data.userId = userId;
    }
    if (formId) {
      data.formName = formList.find(form => form.Id == formId).Name;
      data.formId = formId;
    }
    onChange(data)
    this.handleCancel();
  }

  handleCancel() {
    closeModalContainer(id_div);
  }

  changeAct = (act) => {
    this.setState({act})
  }
  selectUser = (userId) => {
    this.setState({userId})
  }
  selectForm = (formId) => {
    this.setState({formId})
  }
  getAllUser = () => {
    request("/user/get_all", {}).then(res => {
      this.setState({
        userList: res
      })
    })
  }


  getAllForm = () => {
    request("/form/list", {}).then(res => {
      this.setState({
        formList: res
      })
    })
  }

  componentDidMount() {
    this.getAllUser()
    this.getAllForm()
  }

  render() {
    const {title} = this.props;
    const {name, act, userId, userList, formList, formId} = this.state;
    return (
      <>
        <Modal
          title={title || "add"}
          onCancel={this.handleCancel}
          onOk={this.handleConfirm}
          getContainer={() => createModalContainer(id_div)}
          visible={true}
        >
          <LineLayout label="名称:">
            <Input value={name} onChange={e => this.setState({name: U.getValueFromEvent(e)})}/>
          </LineLayout>
          <LineLayout label="选择动作:">
            <Select style={{minWidth: "100px"}} value={act} onChange={e => this.changeAct(U.getValueFromEvent(e))}>
              <Select.Option value="start">发起</Select.Option>
              <Select.Option value="audit">审批</Select.Option>
            </Select>
          </LineLayout>
          {act === "audit" && <LineLayout label="选择审批人:">
            <Select style={{minWidth: "200px"}} value={userId || ''}
                    onChange={e => this.selectUser(U.getValueFromEvent(e))}>
              {userList && userList.map(user => {
                return <Select.Option key={user.Id} value={user.Id}>{user.username}</Select.Option>
              })}
            </Select>
          </LineLayout>}
          <LineLayout label="关联表单:">
            <Select style={{minWidth: "200px"}} value={formId || ''}
                    onChange={e => this.selectForm(U.getValueFromEvent(e))}>
              {formList && formList.map(form => {
                return <Select.Option key={form.Id} value={form.Id}>{form.Name}</Select.Option>
              })}
            </Select>
          </LineLayout>
        </Modal>
      </>
    );
  }
}

export default CreateNode;
