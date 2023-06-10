import { BrowserRouter  , Routes,Route} from "react-router-dom";
import React from 'react'

import App from "./App";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import Database from "./components/Database";
import Function from "./components/Function";
import EditpasswordComponent from "./components/EditUserComponent";
import EditPasswordComponent from "./components/EditPasswordComponent";
import ServiceApi from "./components/ServiceApi";

import LoginRoute from "./LoginRoute";
import AdminMode from "./components/AdminMode";
import AdminRoute from "./LoginAdminRoute";
import AdminEditUser from "./components/AdminEditUser";
import Howuse from "./components/Howuse";
const MyRoute =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path="/howuse" exact element={<Howuse/>}/>
                <Route path='adminmode' exact element={ <AdminRoute component={AdminMode}/>}/>
                <Route path='adminmedit' exact element={ <AdminRoute component={AdminEditUser}/>}/>
                <Route path='createuser' exact element={ <AdminRoute component={RegisterComponent}/>}/>
                <Route path='login' exact element={<LoginComponent/>}/>
                <Route path='data' exact element={<LoginRoute component={Database}/>}/>
                <Route path='function' exact element={<LoginRoute component={Function}/>}/>
                <Route path='editprofile' exact element={<LoginRoute component={EditpasswordComponent}/>} />
                <Route path='ServiceApi' exact element={<LoginRoute component={ServiceApi}/>} />
                <Route path='editprofile/password' exact element={<LoginRoute component={EditPasswordComponent}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default MyRoute