import React from "react";
import {maps} from '../data'

function Preview(props) {
  const {properties, changeActive, active} = props;
  return (
    <>
      {properties && properties.length > 0 && properties.map((item, index) => {
        const {key, ...rest} = item;
        const {preview: Component} = maps[key];
        return <Component isActive={active == index} changeActive={(e) => changeActive(index)} key={index} {...rest}/>
      })}
    </>
  );
}

export default Preview

