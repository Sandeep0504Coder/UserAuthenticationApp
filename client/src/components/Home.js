import React,{useEffect,useState} from 'react'

export default function Home() {
  const [name,setName]=useState("")
  const callHomePage=async()=>{
    try{
      const res=await fetch("/getData",{
        method:"GET",
        headers:{
          "Content_Type":"application/json"
        }
       })
       const data=await res.json()
       setName(data.name)
    }catch(error){
      console.log(error)
    }
   
   
  }
  useEffect(() => {
    callHomePage()
  }, []);
  return (
    <>
    <div className="home-page">
      <div className="home-div">
        <p>WELCOME</p>
        {name===""? <div><h1 className='fw-bolder'>We Are The MERN Developer</h1></div> :<div><h1 className='fw-bolder'>{name}<i className="fa-solid fa-circle-check px-3" ></i></h1> <h3>Happy, to  see you back</h3></div>}
        
      </div>
        
    </div>
    </>
    
  )
}
