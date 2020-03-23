import React from 'react';
import {Button, Card, message, Table} from "antd";
import history from "../../history";
import {request} from "../utils/request";
import U from "../utils/U";

const FormPage = props => {
  const [list, setList] = React.useState([]);

  const newForm = (id = '0') => {
    console.log("111",id)
    history.push(`/form-edit/${id}`)
  }
  const deleteForm = (id) => {
    request("/form/delete", {id}).then(res => {
      message.success("删除成功")
      fetchList()
    })
  }
  const fetchList = () => {
    request("/form/list", {}).then(list => setList(list))
  }
  React.useEffect(() => {
    fetchList()
  }, [])
  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'Id'
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'Name'
    },
    {
      title: 'createdAt',
      key: 'createdAt',
      dataIndex: 'CreatedAt',
      render: time => U.date.format(U.date.parse(time), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: 'updatedAt',
      key: 'updatedAt',
      dataIndex: 'UpdatedAt',
      render: time => U.date.format(U.date.parse(time), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: 'option',
      key: 'option',
      dataIndex: 'option',
      render: (text, item) => (<>
        <a onClick={() => newForm(item.Id)}>edit </a>
        <a onClick={(e => deleteForm(item.Id))}>delete</a>
      </>)
    }
  ]
  return <div style={{flex: 1}}>
    <Card bordered={null}>
      <div style={{marginBottom: 10}}>
        <Button onClick={() => newForm()}>创建表单</Button>
      </div>
      {list && <Table
        dataSource={list}
        columns={columns}
        rowKey={record => record.Id.toString()}
      />}
    </Card>

  </div>
}
export default FormPage
