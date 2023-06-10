import axios from "axios";
import {  useState } from "react";
import { getToken, token_refresh, updataToken } from "../service/authorize";
import "./css/Function.css";
import NavBar from "./NavBar";
import Abstractive from "./propsComponents/Abstractive";
import Extractive from "./propsComponents/Extractive";
import Swal from "sweetalert2";
import React from 'react'
const Function = (props) => {
  const [isloading, setisloading] = useState(false);
  const [displayComponent, setDisplayComponent] = useState("component1");
  const [data, setdata] = useState([]);
  const [name,setname] = useState('Extractive')
  const [state, setstate] = useState({
    input: "",
  });
  const { input } = state;
  const inputvalue = (name) => (event) => {
    setstate({ ...state,[name]: event.target.value });
  };
  const Component1 = () => {
    return (
      <Abstractive
        isloading={isloading}
        setstate={setstate}
        state={state}
        {...data}
      />
    );
  };
  const Component2 = () => {
    return (
      <Extractive
        isloading={isloading}
        setstate={setstate}
        state={state}
        {...data}
      />
    );
  };
  const switchComponents = () => {
    if (displayComponent === "component1") {
      setDisplayComponent("component2");
      setname('Abstractive')
    } else {
      setDisplayComponent("component1");
      setname('Extractive')
    }
  };
  const handsumbit = (e) => {
    e.preventDefault();
    if (input === "") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `มีข้อมูลไม่ถูกกรอก`,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
          refresh: token_refresh(),
        })
        .then((res) => {
          updataToken(res);
          axios
            .post(
              `${process.env.REACT_APP_API}/api/functions/`,
              { input },
              {
                headers: {
                  Authorization: `Bearer ${getToken()}`,
                },
              }
            )
            .then((res) => {
              setdata(res.data.data);
              setisloading(true);
            })
            .catch((err) => console.log(err));
        });
    }
  };
  return (
    <div>
      <NavBar />
      <div>
        <div className="container my-3">
        <label htmlFor="InputID" className="form-label">
              เลือกดูข้อมูล
            </label>
          <form onSubmit={handsumbit}>
            <input
              type="number"
              className="form-control"
              onChange={inputvalue("input")}
              value={input}
              max="3190"
              min="1"
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
            <div className="container center">
              <button className="btn btn-outline-primary ">
              ดูข้อมูล
            </button>
            {isloading &&(<button onClick={switchComponents} className=" btn btn-outline-primary my-3">
            สลับผลสรุป {name}
          </button>)}
            </div>
          </form>
        </div>
        {displayComponent === "component1" ? <Component1 /> : <Component2 />}
      </div>
    </div>
  );
};
export default Function;
