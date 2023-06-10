import { Tabs } from 'antd';
import NavBar from "./NavBar";
import React  from 'react';
import DatabaseHow from "./HowuserComponent/DatabaseHow";
import FunctionHow from "./HowuserComponent/FunctionHow";
import ServiceApiHow from './HowuserComponent/ServiceApiHow';

const items  = [
  {
    key: '1',
    label: `คลังข้อมูล`,
    children: <DatabaseHow/>,
  },
  {
    key: '2',
    label: `ฟังก์ชันจำแนกประเภทผลสรุป`,
    children: <FunctionHow/>,
  },
  {
    key: '3',
    label: `บริการ API`,
    children: <ServiceApiHow/>,
  },
];
const Howuse = () => {
  return (
    <div>
      <NavBar />
      <div className="container my-4">
      <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </div>
  );
};
export default Howuse;
