import { Navigate } from "react-router-dom";
import React from 'react'

export default function AdminRoute({component:Component,...rest}){

    return sessionStorage.getItem('is_superuser') ==="true"  ? <Component/> : <Navigate to='/'/>;
}

