import React from 'react';
import {Button, Card, Table} from "antd";
import history from "../../history";
import {request} from "../utils/request";

const FormPage = props => {
  const [list, setList] = React.useState([]);

  const newForm = (id = '0') => {
    history.push(`/form-edit/${id}`)
  }
  React.useEffect(() => {
    request("/form/list", {}).then(list => setList(list))
  }, [])
  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'Id'
    },
    {
      title: 'createdAt',
      key: 'createdAt',
      dataIndex: 'createdAt'
    },
    {
      title: 'createdBy',
      key: 'createdBy',
      dataIndex: 'createdBy'
    },
    {
      title: 'option',
      key: 'option',
      dataIndex: 'option',
      render: (text, item) => (<><a onClick={() => newForm(item.Id)}>edit </a> <a>delete</a></>)
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
