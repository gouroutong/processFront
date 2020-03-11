import React from 'react';
import {Button, Card, message, Table} from "antd";
import {request} from "../utils/request";
import CreateNode from "./component/CreateNode";

const ProcessEdit = props => {
  const [properties, setProperties] = React.useState([]);
  const [active, setActive] = React.useState(-1)
  const {match, history} = props;
  const id = parseInt(match.params.id || '0');
  React.useEffect(() => {
    if (id > 0) {
      request('/form/item', {Id: id}).then(item => {
        const {Id, Content} = item;
        const properties = Content ? JSON.parse(Content) : []
        setProperties(properties)
      })
    }
  }, [id])
  const allColumn = (key) => setProperties(properties => [...properties, {key}])
  const gridStyle = {
    flex: 3,
  };
  const gridCenterStyle = {
    flex: 4,
    border: 'none',
    overflow: 'auto'
  };
  // const FormItem = e => {
  //   e.stopPropagation();
  //   request("/form/new", {content: JSON.stringify(properties)}).then(res => {
  //     if (res) {
  //       message.success("success");
  //     }
  //   })
  // }
  const handleSubmit = e => {
    e.stopPropagation();
    let data = {};
    if (id > 0) {
      data.id = id
    }
    data.content = JSON.stringify(properties)
    request("/form/new", data).then(res => {
      if (res) {
        history.goBack();
        message.success("success");
      }
    })
  }
  const add = () => {
    CreateNode.open({
      title:'创建节点',

    })
  }
  return <Card
    size="small"
    extra={(<><Button onClick={add}>Add</Button> <Button onClick={handleSubmit}>Save</Button></>)}
    bordered={null}
  >
    <Table/>
  </Card>
}
export default ProcessEdit
