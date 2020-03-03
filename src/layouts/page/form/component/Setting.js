import React from "react";
import {maps} from '../data'

function Setting(props) {
  const {property, changeItem} = props;
  if (!property) {
    return null
  }
  const {key, ...restProps} = property;
  const {setting: Component} = maps[key];
  return <Component
    changeItem={kv => {
      changeItem({
        ...property,
        ...kv
      })
    }}
    {...restProps}
  />
}

export default Setting

