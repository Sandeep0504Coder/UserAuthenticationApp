import {React,useEffect,useState} from "react";

export default function Contact() {
  const [userData,setUserData]=useState({name:"",email:"",phone:"",message:""});
  const callContactPage=async()=>{
    try{
      const res=await fetch("/getdata",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data=await res.json()
      console.log(data);
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});
      if(!res.status===200){
        const error=new Error(res.error)
        throw error;
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    callContactPage();
  }, []);
  //we are storing data in states
  const handleInputs=(event)=>{
    setUserData({...userData,
      [event.target.name]:event.target.value
    })
    console.log(userData)
  }
  /*send the data to backend*/
  const postContactData=async(event)=>{
    event.preventDefault();
    const {name,email,phone,message}=userData;
    const res=await fetch("/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,phone,message})
    });
    const data=await res.json();
    if (!data){
      console.log("message not send")
    }else{
      window.alert("Message Send Successfully")
      setUserData({...userData,message:""})
    }
    
  }
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between flex-wrap align-items-center">
              <div className="contact_info_item d-flex justify-content-start align-item-center shadow p-3 mt-5 mb-5 bg-body rounded">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title fw-bold">Phone</div>
                  <div className="contact_info_text">+914587868937</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center shadow p-3 mt-5 mb-5 bg-body rounded">
                <img
                  src="https://img.icons8.com/office/24/000000/inbox.png"
                  alt="email"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title fw-bold">Email</div>
                  <div className="contact_info_text">
                    sandeep568778@gmail.com
                  </div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center shadow p-3 mt-5 mb-5 bg-body rounded">
                <img
                  src="https://img.icons8.com/office/24/000000/address.png"
                  alt="email"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title fw-bold">Address</div>
                  <div className="contact_info_text">
                    Kolkata, West Bengal, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact_form ">
        <div className="container shadow p-3 mt-5 mb-5 bg-body rounded">
          <div className="row ">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5 ">
                <div className="contact_form_title fw-bold fs-3">
                  Get in Touch
                </div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name mt-4 d-flex flex-wrap justify-content-between align-items-between">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      placeholder="Your Name"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      placeholder="Your Email"
                      required
                    />
                    <input
                      type="number"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div className="contact_form_text mt-4">
                    <textarea
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      className="text_field contact_form_message "
                      cols="30"
                      rows="10"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      onClick={postContactData}
                      className="button contact_submit_button mt-3 p-1"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
