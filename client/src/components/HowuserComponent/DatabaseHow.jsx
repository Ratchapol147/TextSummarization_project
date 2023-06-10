import { Divider, Image } from "antd";
import gif from './imgs/database/Desktop 20-3-2566 22-20-47.gif'
import img1 from './imgs/database/Screenshot 2023-03-20 222901.png'
import img2 from './imgs/database/Screenshot .png'
import React from 'react'

const DatabaseHow = () => {
  return (
    <div>
      <div>
        <Divider orientationMargin={50}>ขั้นตอนแรก</Divider>
        <p>
          <Image
            width={350}
            height={200}
            src={gif}
          />
          &nbsp;&nbsp; 
          <label>เลือกไปเมนูเลือกหัวข้อ คลังข้อมูล</label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสอง</Divider>
        <p>
        <Image
            width='auto'
            height='auto'
            src={img1}
          />&nbsp;&nbsp; 
        <label>เลือก ID จากการพิมพ์ หรือ เลื่อนจากแถบ Range เพื่อเลือก ID ได้</label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสาม</Divider>
        <p>
        <Image
            width={400}
            height={200}
            src={img2}
          />&nbsp;&nbsp; 
        <label>ข้อมูลที่ถูกเลือกจะถูกแสดง</label>
        </p>
      </div>
    </div>
  );
};
export default DatabaseHow;
