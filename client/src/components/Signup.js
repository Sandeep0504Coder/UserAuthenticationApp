import React,{useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import signup from "./images/signup2.jpg";
export default function Signup() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    phone:"",
    email:"",
    work:"",
    password:"",
    cpassword:""
  })
  const handleChange=(event)=>{
    setUser((prevUser)=>{
      return {...prevUser,
      [event.target.name]:event.target.value}
    })
  }

  const PostData=async (event)=>{
    event.preventDefault();
    const {name,email,phone,work,password,cpassword}=user;
    const res=await fetch("/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword
      })
    })
    const data=await res.json()
    if(res.status===422||!data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration")
    }
    else{
      window.alert("Registration Successful");
      console.log("Successful Registration");
      navigate("/login");
    }
  }
  return (
    <>
      <div className="container ">
        <div className="row shadow p-3 mt-5 mb-5 bg-body rounded">
          <div className=" col-6">
            <div>
            <img src={signup} alt="signup" className="signupImg" />
            </div>
    
            <NavLink to="/login" className="signup-image-link ">I am already register </NavLink>
           
          </div>
          <div className="col-6 mt-3 ">
            <h1 className="signupText mb-4">Sign Up</h1>
            <form method="POST" className="signupForm">
              <div className=" mb-3">
                <label htmlFor="name" className="form-label">
                <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name} 
                  id="name"
                  autoComplete="off"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                </label>
                <input
                  type="number"
                  name="phone"
                  value={user.phone}
                  id="phone"
                  autoComplete="off"
                  placeholder="Your Phone" 
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  id="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="work" className="form-label">
                <i className="zmdi zmdi-slideshow material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="work"
                  value={user.work}
                  id="work"
                  placeholder="Your Profession"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  id="password"
                  placeholder="Your Password"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="cpassword" className="form-label">
                <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  id="cpassword"
                  placeholder="Confirm Your Password"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              
              <button type="submit" name="signup" id="signup" className="btn btn-primary mb-3"  onClick={PostData}>Register</button>
                
            
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
