import React from "react";
import {Button, Card, Table} from "antd";
import U from "../utils/U";

const Event = (props) => {
  // const [list, setList] = React.useState([]);

  const agree = () => {
    console.log("agree")
  }
  const defuse = () => {
    console.log("defuse")
  }


  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '申请人',
      key: 'applicant',
      dataIndex: 'applicant'
    },
    {
      title: '申请时间',
      key: 'applyAt',
      dataIndex: 'applyAt',
      render: time => U.date.format(U.date.parse(time), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: '流程',
      key: 'process',
      dataIndex: 'process',
    },
    {
      title: '当前步骤',
      key: 'currentStep',
      dataIndex: 'currentStep',
    },
    {
      title: '审批意见',
      key: 'comment',
      dataIndex: 'comment',
      render: (text, item) => (<>
        <a onClick={() => agree(item.Id)}>同意 </a>
        <a onClick={(e => defuse(item.Id))}>拒绝</a>
      </>)
    }
  ]

  const list = [
    {
      key: '1',
      title: "花花请假一天",
      applicant: "花花",
    },
  ]


  return (
    <Card bordered={null}>
      <div style={{marginBottom: 10}}>
        <Button>待审核</Button>
        <Button>已审核</Button>
      </div>
      {list && <Table
        dataSource={list}
        columns={columns}
        // rowKey={record => record.Id.toString()}
      />}
    </Card>
  )
}

export default Event
