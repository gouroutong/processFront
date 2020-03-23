import React from 'react';
import Preview from "./component/Preview";
import {maps} from './data'
import Setting from "./component/Setting";
import {Button, Card, message} from "antd";
import {request} from "../utils/request";

const FormEdit = props => {
  const [properties, setProperties] = React.useState([]);
  const [active, setActive] = React.useState(-1)
  const [name, setName] = React.useState('')
  const {match, history} = props;
  const id = parseInt(match.params.id || '0');

  React.useEffect(() => {
    if (id > 0) {
      request('/form/item', {Id: id}).then(item => {
        const {Id, Content, Name} = item;
        const properties = Content ? JSON.parse(Content) : []
        setProperties(properties)
        setName(Name)
      })
    }
  }, [id])
  const allColumn = (key) => setProperties(properties => [...properties, {key}])
  const gridStyle = {
    flex: 2,
  };
  const gridCenterStyle = {
    flex: 4,
    border: 'none',
    overflow: 'auto'
  };
  const rightGridStyle = {
    flex: 3,
  };
  
//TODO
  const handleSubmit = e => {
    e.stopPropagation();
    let data = {};
    if (id > 0) {
      data.id = id
    }
    data.content = JSON.stringify(properties)
    data.name = name
    request("/form/new", data).then(res => {
      if (res) {
        history.goBack();
        message.success("success");
      }
    })
  }
  return <Card
    size="small"
    extra={<Button onClick={handleSubmit}>Save</Button>}
    bordered={null}
    style={{flex: 1, overflow: 'auto', display: 'flex', flexFlow: 'column'}}
    bodyStyle={{flex: 1, display: 'flex', overflow: 'auto'}}
  >
    <Card.Grid style={gridStyle}>
      <label>工具箱</label>
      {Object.values(maps).map(item => {
        return <button key={item.key} onClick={() => {
          allColumn(item.key)
          setActive(pre => properties.length)
        }} style={{margin: "8px 40px", backgroundColor: "#f1f1f1", width: "100px"}}>
          {item.label}
        </button>
      })}
    </Card.Grid>
    <Card.Grid style={gridCenterStyle}>
      <Preview properties={properties} active={active} changeActive={(newActive) => setActive(newActive)}/>
    </Card.Grid>
    <Card.Grid style={rightGridStyle}>
      {active >= 0 && <Setting
        property={properties[active]}
        changeName={(name) => setName(name)}
        name={name}
        changeItem={(item) => {
          let newProperties = [...properties]
          newProperties[active] = item
          setProperties(newProperties)
        }}/>}
    </Card.Grid>
  </Card>
}
export default FormEdit
