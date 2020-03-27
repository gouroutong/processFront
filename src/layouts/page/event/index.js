import React from 'react';
import {Button, Card, Table} from 'antd';
import U from '../utils/U';
import {request} from '../utils/request';

const Event = (props) => {
  const [list, setList] = React.useState([]);
  const {history} = props;
  const fetchApply = () => {
    request('/event/list', {}).then((res) => {
      setList(res);
    });
  };
  const deleteApply = (id) => {
    request('/apply/delete', {id}).then((res) => {
      if (res) {
        fetchApply();
      }
    });
  };
  const editApply = (item) => {
    history.push(`/apply_edit/${item.Id}?processId=${item.ProcessId}`);
  };
  React.useEffect(() => {
    fetchApply();
  }, []);

  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'Id',
    },
    {
      title: '流程',
      key: 'process',
      dataIndex: 'ProcessName',
    },
    {
      title: '申请人',
      key: 'applicant',
      dataIndex: 'StartUsername',
    },
    {
      title: '申请时间',
      key: 'createdAt',
      dataIndex: 'CreatedAt',
      render: (time) => U.date.format(U.date.parse(time), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'UpdatedAt',
      render: (time) => U.date.format(U.date.parse(time), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: '审批意见',
      key: 'comment',
      dataIndex: 'Status',
      render: (status, item) => (
        <>
          {status == 0 && <a>审核中 </a>}
          {status == 2 && <a>审核失败</a>}
          {status == 1 && <a>审核成功 </a>}
        </>
      ),
    },
    {
      title: '操作',
      key: 'opt',
      dataIndex: '',
      render: (status, item) => (
        <>
          <a onClick={() => editApply(item)}> 查看 </a>
          {false && <a onClick={() => deleteApply(item.Id)}> 删除 </a>}
        </>
      ),
    },
  ];

  return (
    <Card bordered={null}>
      {list && (
        <Table
          dataSource={list}
          columns={columns}
          rowKey={(record) => record.Id.toString()}
        />
      )}
    </Card>
  );
};

export default Event;
