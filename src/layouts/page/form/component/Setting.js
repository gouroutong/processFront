import React from "react";
import {maps} from '../data'
import {Input, Tabs} from 'antd';
import LineLayout from "../../components/Form/LineLayout";
import U from "../../utils/U";

function Setting(props) {
  const {property, changeItem, changeName, name} = props;
  if (!property) {
    return null
  }
  const callback = () => {

  }
  const {key, ...restProps} = property;
  const {setting: Component} = maps[key];
  return <Tabs defaultActiveKey="1" onChange={callback}>
    <Tabs.TabPane tab="控件属性" key="1">
      <Component
        changeItem={kv => {
          changeItem({
            ...property,
            ...kv
          })
        }}
        formKey={key}
        {...restProps}
      />
    </Tabs.TabPane>
    <Tabs.TabPane tab="表单属性" key="2">
      <LineLayout label={"表单名称"}>
        <Input value={name} onChange={e => changeName(U.getValueFromEvent(e))}/>
      </LineLayout>
    </Tabs.TabPane>
  </Tabs>


}

export default Setting

