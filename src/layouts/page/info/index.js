import React from "react";
import {Descriptions,Card} from "antd";


const Info = (props) =>{
    return (
        <Card>
        <Descriptions
          title="我的信息"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="姓名">花花</Descriptions.Item>
          <Descriptions.Item label="入职时间">2020-2-9</Descriptions.Item>
          <Descriptions.Item label="职务">主管</Descriptions.Item>
          <Descriptions.Item label="所属部门">行政部</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
}

export default Info;