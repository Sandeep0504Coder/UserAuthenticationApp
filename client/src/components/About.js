import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "./images/photoSandeep3.jpg";
export default function About() {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({});
  const callAboutPage=async()=>{
    try{
      const res=await fetch("/about",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json()
      console.log(data);
      setUserData(data);
      if(!res.status===200){
        const error=new Error(res.error)
        throw error;
      }
    }catch(err){
      console.log(err)
      navigate("/login")
    }
  }
  useEffect(() => {
    callAboutPage();
  }, []);
  
  return (
    <>
      <div className="container emp-profile shadow p-3 mt-5 mb-5 bg-body rounded">
        <form method="GET">
          <div className="row ">
            <div className="col-md-4  my-4 px-5">
              <div className="profile-img">
              <img src={profilePic} alt="sandeep" />
              </div>
            </div>
            <div className="col-md-6 my-5" id="profile-head">
              <div className="profile-head">
                <h5 className="fw-bolder">{userData.name}</h5>
                <h6 className="fw-semibold">{userData.work}</h6>
                <p className="pofile-rating mt-3 mb-5">
                  RANKINGS: <span >1/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item active">
                    <a
                      className="nav-link  fw-bolder"
                      
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link  fw-bolder"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 " id="profile-edit-btn">
              <input type="submit" className="profile-edit-btn my-5" name="btnAddMore" value="Edit Profile"  />
            </div>
          </div>
          <div className="row">
            {/*left side url */}
            <div className="col-md-4">
              <div className="profile-work mx-5">
                <p>WORK LINK</p>
                <a href="https://www.linkedin.com/in/sandeep-mandal-b93508207/" target="_blank">LinkedIn</a> <br />
                <a href="https://github.com/Sandeep0504Coder" target="_blank">GitHub</a> <br />
                <a href="https://www.hackerrank.com/sandeepmandal051" target="_blank">HakerRank</a> <br />
                <a href="https://leetcode.com/SandeepMandal0504/" target="_blank">LeetCode</a> <br />
                <a href="https://www.hackerearth.com/@sandeepmandal0504" target="_blank">HackerEarth</a> <br />
                 
              </div>
            </div>
            {/*right side data toggle*/}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active fw-semibold" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade show fw-semibold" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label >Experience</label>
                    </div>
                    <div className="col-6">
                      <p>Intermediate</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>1$/hr</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Total Projects</label>
                    </div>
                    <div className="col-6">
                      <p>8</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >English Level</label>
                    </div>
                    <div className="col-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Availability</label>
                    </div>
                    <div className="col-6">
                      <p>Immediate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
