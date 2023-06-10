import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "./NavBar";
import React  from 'react';
const RegisterComponent = () => {
  const [state, setstate] = useState({
    username: "",
    password: "",
    email: "",
    repassword: "",
    first_name: "",
    last_name: "",
  });
  const { username, password, repassword, email, first_name, last_name } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };

  const submitform = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `Password ไม่ตรงกัน`,
      });
      // setstate({ password: "",repassword: ""})
    } else if (
      username === "" &&
      password === "" &&
      email === "" &&
      first_name === "" &&
      last_name === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `มีข้อมูลไม่ถูกกรอก`,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/auth/register/`, {
          username,
          password,
          repassword,
          email,
          first_name,
          last_name,
        })
        .then((Response) => {
          //สำเร็จ
          Swal.fire("Success", "สมัครสมาชิกสำเร็จ!", "success");
          setstate({
            username: "",
            password: "",
            email: "",
            repassword: "",
            first_name: "",
            last_name: "",
          });
        })
        .catch((err) => {
          if (err.response.data.Errors["email"] === undefined) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: `${err.response.data.Errors["username"]}`,
            });
            
          } else {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: `${err.response.data.Errors["email"]}`,
            });
          }
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-3">เพิ่มผู้ใช้งานผ่านผู้ดูแลระบบ</h2>
        <form onSubmit={submitform}>
          <label htmlFor="inputPassword5" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="inputPassword5"
            className="form-control"
            value={username}
            onChange={inputvalue("username")}
            placeholder='ไอดีผู้ใช้งาน'
          />
          <label htmlFor="inputPassword5" className="form-label">
            Firstname
          </label>
          <input
            type="text"
            id="inputPassword5"
            className="form-control"
            value={first_name}
            onChange={inputvalue("first_name")}
            placeholder='ชื่อจริง'
          />
          <label htmlFor="inputPassword5" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            id="inputPassword5"
            className="form-control"
            value={last_name}
            onChange={inputvalue("last_name")}
            placeholder='นามสกุล'
          />
          <label htmlFor="inputPassword5" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputPassword5"
            className="form-control"
            value={email}
            onChange={inputvalue("email")}
            placeholder='อีเมล์ผู้ใช้งาน'
          />
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            value={password}
            onChange={inputvalue("password")}
            placeholder='กรอกรหัสผ่าน'
          />
          <label htmlFor="inputPassword5" className="form-label">
            RePassword
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            value={repassword}
            onChange={inputvalue("repassword")}
            placeholder='กรอกรหัสผ่าน'
          />
          <button type="submit" className="my-3 btn btn-outline-primary">
            เพิ่มผู้ใช้งาน
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterComponent;
