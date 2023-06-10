//เก็บข้อมูล หรือ เก็บ token / token_refresh  => session storge
import jwt_decode from "jwt-decode";

export const authenticate =(response,next)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลลงใน session storge
        const decoded = jwt_decode(response.data.access);
        sessionStorage.setItem("token",JSON.stringify(response.data.access))
        sessionStorage.setItem("email",JSON.stringify(decoded.email))
        sessionStorage.setItem("user_id",JSON.stringify(decoded.user_id))
        sessionStorage.setItem("name",JSON.stringify(decoded.name))
        sessionStorage.setItem("refresh",JSON.stringify(response.data.refresh))
        sessionStorage.setItem("apikey",JSON.stringify(decoded.API))
        sessionStorage.setItem("is_superuser",JSON.stringify(decoded.is_superuser))

    }
    next()
}

//ดึงข้อมูล token 
export const putkey =(response)=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("apikey")) {
            return JSON.parse(sessionStorage.getItem("apikey"))
        }else{
            return false
        }
    }
}
export const getstatus =()=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("is_superuser")) {
            return JSON.stringify(sessionStorage.getItem("is_superuser"))
        }else{
            return false
        }
    }
}

export const getkey =(response)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลลงใน session storge
        sessionStorage.setItem("apikey",JSON.stringify(response.data.api_key))
    }

}


export const updataToken =(response)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลลงใน session storge
        sessionStorage.setItem("token",JSON.stringify(response.data.access))
    }

}

//ดึงข้อมูล token 
export const getToken =()=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}
//ดึงข้อมูล token 
export const getUserid =()=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("user_id")) {
            return JSON.parse(sessionStorage.getItem("user_id"))
        }else{
            return false
        }
    }
}
//ดึงข้อมูล token_refresh 
export const token_refresh =()=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("refresh")) {
            return JSON.parse(sessionStorage.getItem("refresh"))
        }else{
            return false
        }
    }
}
//ดึงข้อมูล token_refresh 
export const struser_id =()=>{
    if(window !=="undefined"){
        if (sessionStorage.getItem("user_id")) {
            return JSON.parse(sessionStorage.getItem("user_id"))
        }else{
            return false
        }
    }
}
//Logout
export const logout =(next)=>{
    if(window !=="undefined"){
       sessionStorage.removeItem("token")
       sessionStorage.removeItem("refresh")
       sessionStorage.removeItem("name")
       sessionStorage.removeItem("user_id")
       sessionStorage.removeItem("email")
       sessionStorage.removeItem("apikey")
       sessionStorage.removeItem("is_superuser")
    }
    next()
}
