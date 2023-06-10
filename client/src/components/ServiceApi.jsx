import axios from "axios";
import { Table } from "antd";
import { useEffect, useState } from "react";
import React  from 'react';
import {
  getkey,
  getToken,
  putkey,
  token_refresh,
  updataToken,
} from "../service/authorize";
import './css/ServiceApi.css'
import NavBar from "./NavBar";
import Swal from "sweetalert2";

const ServiceApi = () => {
  const apikey = sessionStorage.getItem("apikey");
  // eslint-disable-next-line
  const [key, setkey] = useState(sessionStorage.getItem("apikey"));
  const but = async (e) => {
    e.preventDefault();
    if (sessionStorage.getItem("apikey") === "undefined") {
      //ไม่มี
      await axios
        .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
          refresh: token_refresh(),
        })
        .then((req) => {
          updataToken(req);
          axios
            .get(`${process.env.REACT_APP_API}/api/getApiKey/`, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((res) => {
              getkey(res);
              setkey(res);
              putkey();
            });
        });
    }else{
      Swal.fire({
        icon: "error",
        title: "APIKey ถูกสร้างไว้แล้ว",
        text: `${sessionStorage.getItem('apikey')}`,
      });
    }
  };
  const apikeydoyouhave = sessionStorage.getItem('apikey') === 'undefined' ? 'Apikey ยังไม่ถูกสร้าง':sessionStorage.getItem('apikey')

  useEffect(() => {}, [apikey]);
  const data1 = [
    {
      key: "1",
      name: <strong>Host</strong>,
      data: `${process.env.REACT_APP_API}/api/ApiNectec/`,
  
    },
    {
      key: "2",
      name: <strong>Method</strong>,
      data: `POST`,
  
    },
    {
      key: "3",
      name: <strong>Header</strong>,
      data: <p>Apikey : {apikeydoyouhave} <br/>Content-Type : Content-Type", "application/json</p>
   
    },
  ];
  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "5%",
    },
    {
      title: "",
      key: "data",
      dataIndex: "data",
    },
  ];
  return (
    <div>
      <NavBar />
      <div>
        <div className="container">
          <h1 className="my-3">บริการ API</h1>
          <Table columns={columns} dataSource={data1} pagination={false} />
          <input disabled type="text" value={apikeydoyouhave} className="form-control my-2" />
          <button onClick={but} className="my-1 btn btn-outline-primary">
            สร้าง Key
          </button>
          <br/><br/>
          <h3>Output</h3>
          <pre>
            <code>
              <xmp> &#123;</xmp>
              <xmp>   "data": &#123;</xmp>
              <xmp>       "data1": "ทดสอบ",                                      //ข้อมูลที่ผู้ใช้งานส่ง</xmp>  
              <xmp>       "data2": "ทดสอบ",                                      //ข้อมูลที่ผู้ใช้งานส่ง</xmp>
              <xmp>       "wordnotFound": 0,                                      //จำนวนคำที่ไม่เจอ</xmp>
              <xmp>       "wordFound": 1,                                         //จำนวนคำที่เจอ</xmp>
              <xmp>       "similarity": 100.0,                                    //ค่าความเหมือนคิดเป็น %</xmp>
              <xmp>       "similarityWord": ["ทดสอบ"],                           // คำที่เจอเหมือนกัน</xmp>
              <xmp>       "Cutworddata1": ["ทดสอบ"],                             //การตัดคำ</xmp>
              <xmp>       "Cutworddata2": ["ทดสอบ"],                            //การตัดคำ</xmp>
              <xmp>       "countworddata1": 1,                                   //จำนวนคำที่นับได้</xmp>
              <xmp>       "countworddata2": 1,                                   //จำนวนคำที่นับได้</xmp>
              <xmp>       "HTMLTag1": "&lt;span style=color:blue&gt;ทดสอบ&lt;/span&gt;",    //เป็น Tag HTML ใช้แสดงผล</xmp>
              <xmp>       "HTMLTag2": "&lt;span style=color:blue&gt;ทดสอบ&lt;/span&gt;",    //เป็น Tag HTML ใช้แสดงผล</xmp>
              <xmp>     &#125;</xmp>
              <xmp> &#125;</xmp>
            </code>
          </pre>
          <br/><br/>
        </div>
        <div className="container">
          <h3>Example code</h3>
          <h3>python</h3>
          <pre>
            <code>
              <xmp> import requests</xmp>
              <xmp> import json</xmp>
              <xmp></xmp>
              <xmp> url = "{process.env.REACT_APP_API}/api/ApiNectec/"</xmp>
              <xmp> payload = json.dumps&#40;&#123; "data1": "ทดสอบ", "data2": "ทดสอบ" &#125;&#41;</xmp>
              <xmp> headers = &#123;'x-api-key': {apikeydoyouhave},
              'Content-Type': 'application/json' &#125;</xmp>
              <xmp> response = requests.request &#40;"POST", url,headers=headers, data=payload&#41;</xmp>
              <xmp> print&#40;response.text&#41;</xmp>
            </code>
          </pre>
        </div>
        <div className="container">
          <h3>JavaScripts</h3>
          <pre>
            <code>
              <xmp> const myHeaders = new Headers&#40;&#41;;</xmp>
              <xmp> myHeaders.append&#40;"x-api-key", {apikeydoyouhave}&#41;;</xmp>
              <xmp> myHeaders.append&#40;"Content-Type", "application/json"&#41;;</xmp>
              <xmp></xmp>
              <xmp> const raw = JSON.stringify&#40;&#123; "data1": "ทดสอบ","data2": "ทดสอบ" &#125;&#41;;</xmp>
              <xmp> const requestOptions = &#123; method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' &#125;;</xmp>
              
              <xmp> fetch&#40;"{process.env.REACT_APP_API}/api/ApiNectec/", requestOptions&#41;</xmp>
              <xmp>   .then&#40;response =&#62; response.text&#40;&#41;&#41;</xmp>
              <xmp>   .then&#40;result =&#62; console.log&#40;result&#41;&#41;</xmp>
              <xmp>  .catch&#40;error =&#62; console.log&#40;error&#41;&#41;;</xmp>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
export default ServiceApi;


