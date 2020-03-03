import React from 'react';
import {Button, Card, Table} from "antd";
import history from "../../history";

const FormPage = props => {
  const newForm = () => {
    history.push("/form-edit/0")
  }
  return <div style={{flex: 1}}>
    <Card bordered={null}>
      <div style={{marginBottom: 10}}>
        <Button onClick={newForm}>创建表单</Button>
      </div>
      <Table/>
    </Card>

  </div>
}
export default FormPage
