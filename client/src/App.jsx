import axios from "axios";
import { useEffect, useState } from "react";
import { FcOk,FcHighPriority } from "react-icons/fc";
import React from 'react'
import { Link } from "react-router-dom";
import png1 from "./components/assets/1.png";
import png2 from "./components/assets/2.png";
import png3 from "./components/assets/3.jpg";
import png4 from "./components/assets/4.webp";
import png5 from "./components/assets/5.png";
import png6 from "./components/assets/6.png";
import "./components/css/App.css";
import NavBar from "./components/NavBar";

function App() {
  const hStyle = { color: "#999999" };
  // eslint-disable-next-line
  const [status, setstatus] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/status`)
      .then((res) => setstatus(res.data));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-fluid ">
        <div className="container"></div>
        <main className="App">
          <div>
            <div
              id="myCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div
                  className="carousel-item active "
                  style={{ backgroundImage: `url(${png2})` }}
                >
                  <div className="container">
                    <div className="carousel-caption text-end">
                      <h1 style={{ hStyle }}>จำแนกประเภทผลสรุปความ</h1>
                      <p style={{ hStyle }}>
                        เป็นระบบที่สามารถจำแนกผลประเภทข้อความได้
                      </p>
                      <p className="nav-link disabled text-light " >สถานะ Server : {status.status === 200 ?<FcOk/> : <FcHighPriority/>}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item"
                  style={{ backgroundImage: `url(${png1})` }}
                >
                  <div className="container">
                    <div className="carousel-caption text-start">
                      <h1 className="textcolor">การสรุปข้อความ</h1>
                      <p className="textcolor">
                        เป็นระบบที่จะทำการตัดคำและทำงานต่าง ๆ กับข้อความ
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item"
                  style={{ backgroundImage: `url(${png3})` }}>
                  <div className="container">
                    <div className="carousel-caption text-end">
                      <h1 style={{ hStyle }}> การคำนวณสถิติ</h1>
                      <p style={{ hStyle }}>
                        เป็นระบบที่จะสามารถทำการคิดค่าและทำงานต่าง ๆ
                        เกี่ยวกับตัวเลขและสถิติ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="container marketing">
              <div className="row">
                <div className="col-lg-4">
                  <img
                    src={png4}
                    alt="png1"
                    width="200px"
                    height="200px"
                    className="bd-placeholder-img "
                  />
                  <h2>คลังข้อมูล</h2>
                  <p>สามารถกดเข้าดูรายละเอียดคลังข้อมูลที่มีอยู่ได้จะแสดงข้อมูลทั้งหมดที่เก็บไว้ </p>
                  <p>
                    <Link className="btn btn-primary" to="/data">
                      หน้าคลังข้อมูล &raquo;
                    </Link>
                  </p>
                </div>
                <div className="col-lg-4">
                  <img
                    src={png5}
                    alt="png1"
                    width="200px"
                    height="200px"
                    className="bd-placeholder-img "
                  />
                  <h2>จำแนกประเภท</h2>
                  <p>ฟังก์ชันหลักในการทำงานของระบบที่มีการทำงานหลายส่วนทั้งการคำนวณสถิติและการทำงานเกี่ยวกับข้อความ</p>
                  <p>
                    <Link className="btn btn-primary" to="/function">
                      หน้าจำแนกประเภท &raquo;
                    </Link>
                  </p>
                </div>
                <div className="col-lg-4">
                  <img
                    src={png6}
                    alt="png1"
                    width="200px"
                    height="200px"
                    className="bd-placeholder-img "
                  />
                  <h2>บริการ API</h2>
                  <p>หน้าแสดงการนำ API ไปใช้งานพร้อมกับตัวอย่าง และ ปลอดภัยด้วยการใช้ APIKEY </p>
                  <p>
                    <Link className="btn btn-primary" to="/ServiceApi">
                      หน้าเซอร์วิส &raquo;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
