import React from 'react';
import {Button, Card, message, Table} from "antd";
import history from "../../history";
import {request} from "../utils/request";
import U from "../utils/U";

const ProcessPage = props => {
  const [list, setList] = React.useState([]);

  const newProcess = (id = '0') => {
    history.push(`/process-edit/${id}`)
  }
  const deleteProcess = (id) => {
    request("/process/delete", {id}).then(res => {
      message.success("删除成功")
      fetchList()
    })
  }
  const fetchList = () => {
    request("/process/list", {}).then(list => setList(list))
  }
  React.useEffect(() => {
    fetchList()
  }, [])
  const columns = [
    {
      title: 'Id',
      key: 'Id',
      dataIndex: 'Id'
    },
    {
      title: 'Name',
      key: 'Name',
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
      render: (text, item) => (<><a onClick={() => newProcess(item.Id)}>edit </a> <a
        onClick={() => deleteProcess(item.Id)}>delete</a></>)
    }
  ]
  return <div style={{flex: 1}}>
    <Card bordered={null}>
      <div style={{marginBottom: 10}}>
        <Button onClick={() => newProcess()}>创建审批流</Button>
      </div>
      {list && <Table
        dataSource={list}
        columns={columns}
        rowKey={record => record.Id.toString()}
      />}
    </Card>

  </div>
}
export default ProcessPage
