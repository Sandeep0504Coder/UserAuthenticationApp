import React,{useState,useContext} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import login from "./images/login.gif";

import { UserContext } from "../App"; 

export default function Login() {

  const{state,dispatch}=useContext(UserContext)

  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const loginUser=async(event)=>{
    
    event.preventDefault();
    const res=await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data= res.json()
    if(res.status===400||!data){
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials")
    }
    else{
      dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      console.log("Successful Login");
      navigate("/");
    }
  }
  return (
    <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content row shadow p-3 mt-5 mb-5  rounded">
            <div className="signin-image col-6">
              <figure>
                <img src={login} alt="sign in pic" />
              </figure>
              <NavLink to="/signup" className="signup-image-link">
                Create an Account
              </NavLink>
            </div>
            <div className="signin-form col-6">
              <h1 className="form-title my-4 fw-bold">Log In</h1>
              <form method="POST" className="signin-form" id="signin-form">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    id="email"
                    className="sign-in-form-input"
                    autoComplete="off"
                    onChange={(event)=>{setEmail(event.target.value)}}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    id="password"
                    className="sign-in-form-input"
                    autoComplete="off"
                    onChange={(event)=>{setPassword(event.target.value)}}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group form-button mt-5">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    onClick={loginUser}
                    value="Login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
