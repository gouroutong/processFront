import React from "react";
import {Input} from "antd";

const styleFun = (isActive) => isActive ? {
  background: 'orange'
} : {}

const InputHoc = Component => props => {
  const {changeActive, isActive, ...restProps} = props;
  return (
    <div style={styleFun(isActive)} onClick={changeActive}>
      <Component {...restProps}/>
    </div>
  )
}
const FormTextarea = InputHoc(props => {
  const {label, placeholder} = props;
  return <>
    <div>label:{label}</div>
    <div>placeholder:{placeholder}</div>
  </>
})
const FormInput = InputHoc(props => {
  const {label, placeholder} = props;
  return <>
    <div>label:{label}</div>
    <div>placeholder:{placeholder}</div>
  </>
})
const FormPhone = InputHoc(props => {
  const {label, placeholder} = props;
  return <>
    <div>label:{label}</div>
    <div>placeholder:{placeholder}</div>
  </>
})
const FormImg = InputHoc(props => {
  const {label, placeholder} = props;
  return <>
    <div>label:{label}</div>
    <div>placeholder:{placeholder}</div>
  </>
})


const InputSetting = props => {
  const {label, placeholder, changeItem} = props
  return <div>
    label:<Input value={label} onChange={e => changeItem({label: e.target.value})}/>
    placeholder:<Input value={placeholder} onChange={e => changeItem({placeholder: e.target.value})}/>
  </div>
}
const maps = {
  input: {
    key: 'input',
    label: '单行输入',
    preview: FormInput,
    setting: InputSetting
  },
  textarea: {
    key: 'textarea',
    label: '多行输入',
    preview: FormTextarea,
    setting: InputSetting
  },
  phone: {
    key: 'phone',
    label: '电话号码',
    preview: FormPhone,
    setting: InputSetting
  },
  img: {
    key: 'img',
    label: '图片',
    preview: FormImg,
    setting: InputSetting
  }


}

export {maps}
