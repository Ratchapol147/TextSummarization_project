import { Navigate } from "react-router-dom";
import { getToken } from "./service/authorize";
import React from 'react'

export default function LoginRoute({component:Component,...rest}){

    return getToken() ? <Component/> : <Navigate to='/login'/>;
}

