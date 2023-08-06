import React,{useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../App";

export default function Logout() {
    const{state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    
    useEffect(() => {
      fetch("/logout",{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
      }).then((res)=>{
        dispatch({type:"USER",payload:false})
        navigate("/login")
        if(res.status!==200){
            throw new Error(res.error)
        }
      }).catch((err)=>{console.log(err);})
    })
    return(
        <>
        </>
    )
    

    
    
 
}
