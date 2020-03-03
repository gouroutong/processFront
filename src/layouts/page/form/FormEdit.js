import React from 'react';
import Preview from "./component/Preview";
import {maps} from './data'
import Setting from "./component/Setting";

const FormEdit = props => {
  const [properties, setProperties] = React.useState([]);
  const [active, setActive] = React.useState(-1)
  const allColumn = (key) => {
    setProperties(properties => [...properties, {key}])
  }
  return <div style={{flex: 1, padding: 20, display: 'flex', background: '#ffffff'}}>
    <div style={{flexBasis: 300}}>
      {Object.values(maps).map(item => {
        return <div key={item.key} onClick={() => {
          allColumn(item.key)
          setActive(pre => properties.length)
        }}>
          {item.label}
        </div>
      })}
    </div>
    <div style={{flex: 1, margin: "0 10px", overflow: 'auto'}}>
      <Preview properties={properties} active={active} changeActive={(newActive) => setActive(newActive)}/>
    </div>
    <div style={{flexBasis: 300}}>
      {active >= 0 && <Setting
        property={properties[active]}
        changeItem={(item) => {
          let newProperties = [...properties]
          newProperties[active] = item;
          setProperties(newProperties)
        }}/>}
    </div>
  </div>
}
export default FormEdit
