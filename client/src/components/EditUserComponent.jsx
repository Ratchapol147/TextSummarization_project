import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import React  from 'react';
import {
  getToken,
  getUserid,
  token_refresh,
  updataToken,
} from "../service/authorize";
import NavBar from "./NavBar";
const EditUserComponent = () => {
  const [state, setstate] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const { username, first_name, last_name, email } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/user/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        const userres = res.data.user;
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
                .get(`${process.env.REACT_APP_API}/auth/user/`, {
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                })
                .then((res) => {
                  const userres = res.data.user;
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
  }, []);
  const updatauser = (e) => {
    e.preventDefault();
    if (first_name === "" || last_name === "" || email === "") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `มีข้อมูลไม่ถูกกรอก`,
      });
    } else {
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
                }/auth/UpdateProfileView/${getUserid()}`,
                { first_name, last_name, email },
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
              .catch((err) =>
                Swal.fire({
                  icon: "error",
                  title: "ERROR",
                  text: `${err.response.data.email.email}`,
                })
              );
          }
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-3">แก้ไขข้อมูลส่วนตัว</h2>
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
          <label htmlFor="Email" className="form-label my-1">
            APIKEY
          </label>
          <input
            disabled
            type="text"
            className="form-control my-1"
            id="Email"
            value={sessionStorage.getItem("apikey")}
          />
          <button className="btn btn-outline-primary my-1">อัพเดทข้อมูล</button>
        </form>
        <Link
          to="/editprofile/password"
          className="btn btn-outline-warning my-2"
        >
          เปลี่ยนรหัสผ่าน
        </Link>
      </div>
    </div>
  );
};
export default EditUserComponent;
