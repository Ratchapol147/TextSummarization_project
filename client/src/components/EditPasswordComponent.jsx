import axios from "axios";
import React  from 'react';
import { useState } from "react";
import Swal from "sweetalert2";
import {
  getToken,
  getUserid,
  token_refresh,
  updataToken,
} from "../service/authorize";
import NavBar from "./NavBar";
const EditPasswordComponent = () => {
  const [state, setstate] = useState({
    old_password: "",
    password: "",
    password2: "",
  });
  const { old_password, password, password2 } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };
  const submitform = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
        refresh: token_refresh(),
      })
      .then((req) => {
        updataToken(req);
        if (password === "" || password2 === "" || old_password === "") {
          Swal.fire({
            icon: "error",
            title: "ใส่ข้อมูลด้วยครับ",
            text: `มีข้อมูลไม่ถูกกรอก`,
          });
        } else {
          if (password === password2) {
            //ถูก
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success  md-3",
                cancelButton: "btn btn-danger  md-3",
              },
              buttonsStyling: false,
            });

            swalWithBootstrapButtons
              .fire({
                title: "แน่ใจเปลี่ยนรหัสผ่าน?",
                text: "ข้อมูลรหัสผ่านจะถูกเปลี่ยน !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ตกลง  !",
                cancelButtonText: "ไม่  !",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  axios
                    .put(
                      `${
                        process.env.REACT_APP_API
                      }/auth/UpdatePassword/${getUserid()}`,
                      { old_password, password, password2 },
                      {
                        headers: {
                          Authorization: `Bearer ${getToken()}`,
                        },
                      }
                    )
                    .then((res) => {
                      swalWithBootstrapButtons.fire(
                        "ข้อมูลถูกอัพเดท!",
                        "success.",
                        "success"
                      );
                    })
                    .catch((err) => {
                      Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: `${err.response.data.old_password.old_password}`,
                      });
                    });
                }
              });
          } else {
            //ผิด
            Swal.fire({
              icon: "error",
              title: "Password",
              text: `รหัสผ่านไม่ตรงกัน`,
            });
          }
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: `${err}`,
        })
      );
  };
  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="my-3">เปลี่ยนรหัสผ่าน</h1>
        <form onSubmit={submitform}>
          <label htmlFor="Old-Password" className="form-label">
            Old-Password
          </label>
          <input
            type="password"
            className="form-control"
            id=" Old-Password"
            value={old_password}
            onChange={inputvalue("old_password")}
            placeholder='รหัสผ่าน'
          />
          <label htmlFor="New-Password" className="form-label">
            New-Password
          </label>
          <input
            type="password"
            className="form-control"
            id="New-Password"
            value={password}
            onChange={inputvalue("password")}
            placeholder='รหัสผ่านใหม่'
          />
          <label htmlFor="New-RePassword" className="form-label">
            New-RePassword
          </label>
          <input
            type="password"
            className="form-control"
            id="New-RePassword"
            value={password2}
            onChange={inputvalue("password2")}
            placeholder='รหัสผ่านใหม่อีกครั้ง'
          />
          <button className="btn btn-outline-primary my-3">
            เปลี่ยนรหัสผ่าน
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditPasswordComponent;
