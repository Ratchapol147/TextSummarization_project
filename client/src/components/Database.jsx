import { Table } from "antd";
import React  from 'react';
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { getToken, token_refresh, updataToken } from "../service/authorize";
import NavBar from "./NavBar";
const Database = () => {
  const [state, setstate] = useState({ input: "" });
  const [isloading, setisloading] = useState(false);
  const { input } = state;
  const [data, setdata] = useState([]);
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };
  const reqeustdata = async (e) => {
    e.preventDefault();
    if (state.input === "") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `มีข้อมูลไม่ถูกกรอก`,
      });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
          refresh: token_refresh(),
        })
        .then((req) => updataToken(req))
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: `${err}`,
          })
        );

      await axios
        .get(`${process.env.REACT_APP_API}/api/datafull/${state.input}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          setdata(res.data);
          setisloading(true);
        })
        .catch((err) => console.log(err));
    }
  };
  const data1 = [
    {
      key: "1",
      name: data.news_author,
      news_title: data.news_title,
      news_content: data.news_content,
      news_counttext: data.news_counttext,
      news_datepublish: data.news_datepublish,
      extractive: data.extractive,
      abstractive: data.abstractive,
    },
  ];
  const columns = [
    {
      title: "สำนักพิมพ์",
      dataIndex: "name",
      key: "name",
      width: "7%",
    },
    {
      title: "หัวข้อข่าว",
      key: "news_title",
      dataIndex: "news_title",
      width: "10%",
    },
    {
      title: "เนื้อหาข่าว",
      key: "news_content",
      dataIndex: "news_content",
    },
  ];
  const columns1 = [
    {
      title: "จำนวนคำของข่าว",
      key: "news_counttext",
      dataIndex: "news_counttext",
      width: "10%",
    },
    {
      title: "วันที่เผยแพร่",
      key: "news_datepublish",
      dataIndex: "news_datepublish",
      width: "10%",
    },
    {
      title: `ผลสรุป (Extractive) `,
      key: "extractive",
      dataIndex: "extractive",
    },
    {
      title: "ผลสรุป (Abstractive)",
      key: "abstractive",
      dataIndex: "abstractive",
    },
  ];

  return (
    <div>
      <NavBar />

      <div className="container-sm my-3">
        <form onSubmit={reqeustdata}>
          <div>
            <label htmlFor="InputID" className="form-label">
              เลือกดูข้อมูล
            </label>
            <input
              type="number"
              className="form-control"
              id="InputID"
              value={input}
              onChange={inputvalue("input")}
              min="1"
              max="3190"
              placeholder="ใส่ตัวเลข ID"
            />
            <input
              type="range"
              className="form-range my-2"
              min="1"
              max="3190"
              id="customRange2"
              value={input}
              onChange={inputvalue("input")}
            />
          </div>
          <button className="btn btn-outline-primary my-2 form-control">
            ดูข้อมูล
          </button>
        </form>
      </div>
      {isloading && (
        <div>
          <Table columns={columns} dataSource={data1} pagination={false} />
          <Table columns={columns1} dataSource={data1} pagination={false} />
        </div>
      )}
    </div>
  );
};
export default Database;
