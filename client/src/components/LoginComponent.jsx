import axios from "axios";
import { useState } from "react";
import NavBar from "./NavBar";
import Swal from "sweetalert2";
import { authenticate } from "../service/authorize";
import {useNavigate} from 'react-router-dom'
import React  from 'react';


const LoginComponent = () => {
 const navigate = useNavigate();
  const [state, setstate] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };
  const submitform = (e) => {
    e.preventDefault();
    if(username ==='' || password ===''){
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: `มีข้อมูลไม่ถูกกรอก`,
          });
    }else{
        axios.post(`${process.env.REACT_APP_API}/auth/login/`,{ username, password })
      .then(response=>{
        //สำเร็จ
        Swal.fire("Login สำเร็จ!", `ยินดีต้อนรับ : ${username}`, "success");
        authenticate(response,()=>navigate('/'))
      })
      .catch(err=>{
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: `Username หรือ Password ผิด`,
          });
      })}
  };
  return (
    <div>
      <NavBar />
      <div className="container-sm">
        <h2>ล็อกอินเข้าสู่ระบบ</h2>
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
          />
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            value={password}
            onChange={inputvalue("password")}
          />
          <button type="submit" className="my-3 btn btn-outline-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;
