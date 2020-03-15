import React from "react";
import {Button, Input, Radio, Switch} from "antd";
import './form.less'
import U from "../utils/U";
import classNames from 'classnames'

const commonStyle = {
  margin: '5px 0',
  padding: 5
};

const styleFun = (isActive) => isActive ? {
  border: '1px dashed grey',
  ...commonStyle
} : {
  ...commonStyle
};

const Label = props => {
  return <div className={classNames("label", {required: props.required})}>{props.label}:</div>
};
const InputHoc = Component => props => {
  const {changeActive, isActive, ...restProps} = props;
  return (
    <div className="form_component" style={styleFun(isActive)} onClick={changeActive}>
      <Component {...restProps}/>
    </div>
  )
};
const FormTextarea = InputHoc(props => {
  const {placeholder} = props;
  return <>
    <Label {...props}/>
    <Input.TextArea disabled={true} placeholder={placeholder}/>
  </>
});
const FormInput = InputHoc(props => {
  const {placeholder} = props;
  return <>
    <Label {...props}/>
    <Input disabled={true} placeholder={placeholder}/>
  </>
});
const FormPhone = InputHoc(props => {
  const {placeholder} = props;
  return <>
    <Label {...props}/>
    <Input disabled={true} placeholder={placeholder}/>
  </>
});
const FormRadio = InputHoc(props => {
  const {options} = props;
  return <>
    <Label {...props}/>
    {options && options.length > 0 && <Radio.Group
      options={options}
      disabled={true}
    />}
  </>
});


const InputSetting = props => {
  const {label, placeholder, required, changeItem, formKey} = props;
  return <div className="form_control">
    <div>
      label:<Input value={label} onChange={e => changeItem({label: U.getValueFromEvent(e)})}/>
    </div>
    <div>
      placeholder:<Input value={placeholder} onChange={e => changeItem({placeholder: U.getValueFromEvent(e)})}/>
    </div>
    <div>
      required:<Switch checked={!!required} onChange={e => changeItem({required: U.getValueFromEvent(e)})}/>
    </div>
  </div>
};

const RadioSetting = props => {
  const {label, required, changeItem, options = []} = props;
  return <div className="form_control">
    <div>
      label:<Input value={label} onChange={e => changeItem({label: U.getValueFromEvent(e)})}/>
    </div>
    <div>
      <Button onClick={() => changeItem({options: [...options, ""]})}>add</Button>
      {options && options.length > 0 && options.map((option, index) => {
        return <Input value={option} onChange={e => {
          const item = U.getValueFromEvent(e);
          let newOptions = [...options];
          newOptions[index] = item;
          changeItem({options: newOptions})
        }}/>
      })}
    </div>
    <div>
      required:<Switch checked={!!required} onChange={e => changeItem({required: U.getValueFromEvent(e)})}/>
    </div>
  </div>
};
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
  radio: {
    key: 'radio',
    label: '单选',
    preview: FormRadio,
    setting: RadioSetting
  },


};

export {maps}
