import { Button, Divider, Image, Modal } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import abs from "./imgs/function/abs.png";
import gif from "./imgs/function/Desktop 20-3-2566 22-35-14.gif";
import ext from "./imgs/function/ext.png";
import gif2 from "./imgs/function/ezgif-2-2c2669cad9.gif";
import img2 from "./imgs/function/Screenshot .png";
import img from "./imgs/function/Screenshot 2023-03-20 225524.png";
import React from 'react'
const FunctionHow = () => {
  const info = () => {
    Modal.info({
      content: (
        <div>
          <Divider orientationMargin={50}>Extractive</Divider>
          <Image width={200} src={ext} />
          <p>
            <strong> Extractive Text Summarization</strong>{" "}
            เป็นการย่อความโดยสกัดข้อความสำคัญออกจากเนื้อความเอกสาร
            โดยพิจารณาว่าข้อความหรือส่วนของข้อความใดที่มีความสำคัญ
            และจะนำข้อความหรือส่วนของข้อความนั้น มาสรุป
            โดยไม่มีการเปลี่ยนแปลงและแก้ไข้ข้อความที่สกัดออกมา
            วิธีการนี้มีข้อดีคือ ทำได้ง่าย แต่ก็ยังมีความไม่สมบูรณ์เช่น
            การอ่านข้อความ อาจจะไม่รื่นไหล
          </p>
          <Divider orientationMargin={50}>Abstractive </Divider>
          <Image width={200} src={abs} />
          <p>
            <strong>Abstractive Text Summarization </strong>
            เป็นการย่อความโดยสกัดข้อความสำคัญออกจากเนื้อความเอกสาร
            จากนั้นนำข้อความที่สกัดออกมาได้มาเรียบเรียงขึ้นใหม่
            โดยคำนึงถึงรายละเอียดว่า ใคร ทำอะไร ที่ไหน เมื่อไร และอย่างไร
            การใช้วิธีนี้จะมีข้อดีคือ เอกสารที่สรุปออกมาจะ สั้น กระชับ
            สามารถอ่านเข้าใจง่าย
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <div>
      <div>
        <Divider orientationMargin={50}>ขั้นตอนแรก</Divider>
        <p>
          <Image width={350} height={200} src={gif} />
          &nbsp;&nbsp;
          <label>เลือกไปเมนูเลือกหัวข้อ ฟังก์ชันจำแนกประเภทผลสรุป</label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสอง</Divider>
        <p>
          <Image width="auto" height="auto" src={img} />
          &nbsp;&nbsp;
          <label>
            เลือก ID จากการพิมพ์ หรือ เลื่อนจากแถบ Range เพื่อเลือก ID ได้
          </label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสาม</Divider>
        <p>
          <Image width={400} height={200} src={img2} />
          &nbsp;&nbsp;
          <label>ข้อมูลที่ถูกเลือกจะถูกแสดง</label>
        </p>
        <Divider orientationMargin={50}>ขั้นตอนสี่</Divider>
        <p>
          <Image width={350} height={200} src={gif2} />
          &nbsp;&nbsp;
          <label>
            สามารถเลือกหัวข้อในการดู ระหว่าง <strong>'Abstractive'</strong> และ{" "}
            <strong>'Extractive'</strong>&nbsp;{" "}
          </label>
          <Button onClick={info}>
            <AiOutlineQuestionCircle />
          </Button>
        </p>
      </div>
    </div>
  );
};
export default FunctionHow;
