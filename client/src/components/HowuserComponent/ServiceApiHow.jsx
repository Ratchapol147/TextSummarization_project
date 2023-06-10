import { Divider, Image } from "antd";
import gif from './imgs/api/Desktop 20-3-2566 22-35-37.gif'
import img1 from './imgs/api/img1.png'
import img2 from './imgs/api/img2.png'
import img3 from './imgs/api/img3.png'
import React from 'react'
const ServiceApiHow = () => {
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
          <label>เลือกไปเมนูเลือกหัวข้อ บริการAPI</label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสอง</Divider>
        <p>
        <Image
            width={350}
            height={200}
            src={img1}
          />
          ตรวจสอบว่าบัญชีของผู้ใข้ได้ทำการสร้าง Apikey ที่ใช้สำหรับเข้าใช้งานหรือยัง ถ้ายังขึ้นว่า <strong>Apikey ยังไม่ถูกสร้าง</strong> ให้ผู้ใช้งานสร้างkey ระบบจะสร้าง apikey ให้ผู้ใช้งานอัตโนมัติ
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสาม</Divider>
        <p>
          ศึกษาวิธีการใช้งานจาก Document เบื้องต้นที่ผู้จัดทำได้เขยนแนะนำวิธีทดสอบใช้งานให้ โดยมี 2 ภาษา Python และ Javascript
        </p>
        <Divider orientationMargin={50}>ทดสอบ Api โดยใช้ Postman </Divider>
        <p>
          ผู้ใช้งานตรวจสอบการใส่ข้อมูล 
          <p>Host :Url</p>
          <p>Method : POST</p>
          <p>Header : Apikey และ Content-Type</p>
          <p>ใส่ข้อมูลตามตัวอย่าง</p>
          <Image
            width={400}
            height={200}
            src={img2}
          />
        </p>
        <br></br>
        <p>ผู้ใช้งานเลือก Body &gt; raw &gt; เปลี่ยนข้อมูลที่ใส่จาก Text เป็น Json</p>
        Body ผู้ใช้จำเป็นต้องการหนดชัดเจนว่าต้งเป็น data1 และ data2 เพื่อให้ระบบเข้าใจในข้อมูลที่ถูกส่งไป &#40;"data1": "ทดสอบ", "data2": "ทดสอบ" &#125;
        <Divider orientationMargin={50}>ทดสอบ Request จาก Api </Divider>
        <p>เมื่อใส่ข้อมูลครบและทำการทดสอบโดยการส่ง Send เพื่อส่ง ทดสอบ</p>
        <p>จะได้ข้อมูลตามที่ระบบและผู้ใช้งานส่งเข้ามา</p>
        <Image
            width={350}
            src={img3}
          />
      </div>
    </div>
  );
};
export default ServiceApiHow;
