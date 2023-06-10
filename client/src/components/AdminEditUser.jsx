import axios from "axios";
import React  from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken, token_refresh, updataToken } from "../service/authorize";
import NavBar from "./NavBar";
const AdminEditUser = () => {
  const [state, setstate] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const { first_name, last_name, email, username } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };
  const location = useLocation();
  const { id } = location.state;
  //id == user_id
  console.log(id);
  const updatauser = (e) => {
    e.preventDefault();
    if(first_name ===''|| last_name ==='' || email ===''){
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `มีข้อมูลไม่ถูกกรอก`,
      });
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success  md-3",
          cancelButton: "btn btn-danger  md-3",
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: "แน่ใจอัพเดทข้อมูล?",
          text: "ข้อมูลจะถูกอัพเดท!",
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
                }/auth/usertest/${id}`,
                {first_name,last_name,email,username},
                {
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                }
              )
              .then((res) =>
                swalWithBootstrapButtons.fire(
                  "ข้อมูลถูกอัพเดท!",
                  "success.",
                  "success"
                )
              )
              .catch((err) =>{
                Swal.fire({
                icon: "error",
                title: "ERROR",
                text: `${err}`,
              })}
               
                
              );
              
          }
        });

    }

    
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/usertest/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        const userres = res.data;
        setstate(userres);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
              refresh: token_refresh(),
            })
            .then((req) => {
              updataToken(req);
              axios
                .get(`${process.env.REACT_APP_API}/auth/usertest/${id}`, {
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                })
                .then((res) => {
                  const userres = res.data;
                  setstate(userres);
                });
            })
            .catch((err) =>
              Swal.fire({
                icon: "error",
                title: "ERROR",
                text: `${err}`,
              })
            );
        }
      });
      // eslint-disable-next-line
  },[]);
  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>แก้ไขข้อมูลผู้ใข้</h2>
        <form onSubmit={updatauser}>
          <label htmlFor="Username" className="form-label">
            Username
          </label>
          <input
            disabled
            type="text"
            className="form-control"
            id="Username"
            value={username}
            onChange={inputvalue("username")}
          />
          <label htmlFor="Firstname" className="form-label">
            Firstname
          </label>
          <input
            type="text"
            className="form-control"
            id="Firstname"
            value={first_name}
            onChange={inputvalue("first_name")}
          />
          <label htmlFor="Lastname" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="Lastname"
            value={last_name}
            onChange={inputvalue("last_name")}
          />
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="Email"
            value={email}
            onChange={inputvalue("email")}
          />

          <button className="btn btn-outline-primary my-2">อัพเดทข้อมูล</button>
        </form>
      </div>
    </div>
  );
};
export default AdminEditUser;
