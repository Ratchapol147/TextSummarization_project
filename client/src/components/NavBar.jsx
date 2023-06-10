import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../service/authorize";
import '../components/css/nav.css';
import React  from 'react';
import { AiOutlineMenu } from "react-icons/ai";
const NavBar = () => {
  const navigate = useNavigate();
  const url =  `${process.env.REACT_APP_API}/admin`
  

  return (
    <nav className="navbar navbar-expand-lg  " >
      <div className="container-fluid">
        {/* ใครก็เข้าถึงได้ */}
        <Link className="navbar-brand" to="/">
          หน้าแรก
        </Link>{" "}
        {/*  */}
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "><AiOutlineMenu/></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav me-auto">
            <li className="nav-item">
              {getToken() && (
                <Link to="/data" className="nav-link ">
                  คลังข้อมูล
                </Link>
              )}
            </li>
            <li className="nav-item">
              {getToken() && (
                <Link to="/function" className="nav-link ">
                  ฟังก์ชันจำแนกประเภทผลสรุป
                </Link>
              )}
            </li>
            <li className="nav-item">
              {getToken() && (
                <Link to="/ServiceApi" className="nav-link ">
                  บริการ API
                </Link>
              )}
            </li>
            <li className="nav-item">
            {getToken() && (
              <Link to="/howuse" className="nav-link ">
                วิธีใช้งาน
              </Link>
            )}
            </li>
          </ul>
          {/* ด้างหลัง */}
          {!getToken() && (
            <Link to="/login" className="login">
              เข้าสู่ระบบ
            </Link>
          )}
          {/* <Link to="/adminmode" className="nav-link">Mode admin</Link> */}
          {getToken() && sessionStorage.getItem("is_superuser") === "true" ? (
          <li className="nav-item dropdown ul">
          <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          การจัดการข้อมูลโดยแอดมิน
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link to="/adminmode" className="nav-link">จัดการผู้ใช้งาน</Link></li>
            <li><Link to={url} className="nav-link">แอดมินเซิร์ฟเวอร์</Link></li>
          </ul>
        </li>
          ) : (<Link></Link>)}
          {getToken() && sessionStorage.getItem("is_superuser") === "true" ? (
            <Link to="/createuser" className="nav-link">
              เพิ่มผู้ใช้งาน
            </Link>
          ) : (
            <Link></Link>
          )}
          {getToken() && (
            <Link to="/editprofile" className="nav-link ">
              แก้ไขข้อมูลส่วนตัว
            </Link>
          )}
          {getToken() && (
            <Link
              to="/"
              className="nav-link"
              onClick={() => logout(() => navigate("/"))}
            >
              ออกจากระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
