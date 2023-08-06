import React,{createContext,useReducer} from "react";
import "bootstrap/dist/css/bootstrap.css"
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";
import {initialState,reducer} from "./reducer/UseReducer"
export const UserContext=createContext();
const Routing=()=>{
  return(
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="*" element={<Errorpage/>}/>
      </Routes>
  )
}
function App() {
 
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing/>
      </UserContext.Provider>
    </>
  );
}

export default App;
