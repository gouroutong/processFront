import React from 'react';
import {Button, Card, Input, message, Table} from "antd";
import CreateNode from "./component/CreateNode";
import {request} from "../utils/request";
import U from "../utils/U";
import LineLayout from "../components/Form/LineLayout";

const ProcessEdit = props => {
  const [list, setList] = React.useState([]);
  const [name, setName] = React.useState("");
  const {match, history} = props;
  const id = parseInt(match.params.id || '0');
  React.useEffect(() => {
    if (id > 0) {
      request("/process/item", {id}).then(res => {
        const {Name: name, NodeList: nodeList} = res
        setList(nodeList.map((node) => {
          const {
            Name,
            FormId,
            Act,
            UserId,
            Username,
            FormName,
            ...rest
          } = node
          return {
            name: Name,
            formId: FormId,
            act: Act,
            userId: UserId,
            username: Username,
            formName: FormName,
            ...rest
          }
        }))
        setName(name)
      })
    }
  }, [id])
  const handleSubmit = e => {
    e.stopPropagation()
    const data = {
      nodeList: list,
      name: name
    }
    if (id > 0) {
      data.id = id;
    }
    request("/process/save", data).then(res => {
      message.success("success")
      history.goBack();
    })

  }
  const add = () => {
    CreateNode.open({
      title: 'add',
      onChange: data => setList(list => [...list, data])
    })
  }
  const close = () => {
    history.goBack();
  }
  const edit = (index) => {
    CreateNode.open({
      title: 'add',
      ...list[index],
      onChange: data => {
        setList(preList => {
          const newList = [...preList]
          newList[index] = {...list[index], ...data};
          return newList
        })
      }
    })
  }
  const del = (index) => {
    setList(preList => {
      const newList = preList.filter((item, i) => i !== index)
      return newList
    })
  }
  return <Card
    size="small"
    extra={(<><Button onClick={add}>添加审批流程</Button> <Button onClick={close}>关闭</Button> <Button
      onClick={handleSubmit}>Save</Button></>)}
    bordered={null}
  >
    <LineLayout label="流程名称:">
      <Input value={name} onChange={e => setName(U.getValueFromEvent(e))}/>
    </LineLayout>
    {list.length > 0 && <Table
      dataSource={list}
      pagination={false}
      rowKey={(record, index) => index.toString()}
      columns={[
        {
          key: 'order',
          dataIndex: '',
          title: 'order',
          render: (text, item, index) => index + 1
        },
        {
          key: 'name',
          dataIndex: 'name',
          title: 'name'
        },
        {
          key: 'action',
          dataIndex: 'act',
          title: 'action',
          render: (text) => ({start: '发起人', audit: '审核人'}[text])
        },
        {
          title: '审核人',
          key: 'username',
          dataIndex: 'username',
        },
        {
          title: '关联表单',
          key: 'formName',
          dataIndex: 'formName',
        },
        {
          key: 'option',
          title: 'option',
          dataIndex: '',
          render: (text, item, index) => {
            return (<><a onClick={() => edit(index)}>edit </a> <a onClick={() => del(index)}>delete</a></>)
          }
        }
      ]}
    />}
  </Card>
}
export default ProcessEdit;
