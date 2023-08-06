const bcrypt=require("bcryptjs")
const express = require("express");
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const router = express.Router();
const authenticate=require("../middleware/authenticate")
require("../db/conn");
const User = require("../models/userSchema");
router.use(cookieParser())





//using promises
/*router.post("/signup", (req, res) => {
      const {name,email,phone,work,password,cpassword}=req.body;
      if (!name||!email||!phone||!work||!password||!cpassword){
        return res.status(422).json({error:"Plz filled the field properly"})
      }
      User.findOne({email:email}).then((userExist)=>{
        if (userExist){
          return res.status(422).json({error:"email already exist"})
        }
        const userData=new User({name,email,phone,work,password,cpassword})
        userData.save().then(()=>{
          res.status(201).json({message:"User registered successfully"})
        }).catch((err)=>res.status(500).json({error:"failed to registered"}))

      }).catch((err)=>{console.log(err);})
        
    
    
  });*/
router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz filled the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    }
    else if(password!=cpassword){
      return res.status(422).json({ error: "password are not matching." });
    }else{
      const userData = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword
      });
      await userData.save();
      res.status(201).json({ message: "User registered successfully" });
    }
    
  } catch (err) {
    console.log(err);
  }
});
router.post("/signin", async (req, res) => {
  const {email,password}=req.body
  if(!email||!password){
    return res.status(400).json({ error: "Plz filled the data" });
  }
  try{
    const userLogin=await User.findOne({email:email})
    if (userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password)
      
      if(isMatch){
        const token=await userLogin.generateAuthToken();
        console.log(token)
        res.cookie("jwtoken",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true
        })
        res.status(200).json({message:"user Signin Successfully."})
      }
      else{
        res.status(400).json({error:"invalid credientials"})
      }
    }
    else{
      res.status(400).json({error:"invalid credientials"})
    }
    

  }catch(err){
    console.log(err)
  }
  
});
/*about ka page */
router.get("/about", authenticate,(req, res) => {
  res.send(req.rootUser);
});
/*get user data for contact and home page*/
router.get("/getData",authenticate,(req,res)=>{
  res.send(req.rootUser);
})
/*Post contact data */
router.post("/contact",authenticate,async(req,res)=>{
  try{
    const {name,email,phone,message}=req.body;
    if(!name||!email||!phone||!message){
      console.log("error in contact form");
      return res.json({error:"plzz filled the contact form"});
    }
    const userContact=await User.findOne({_id:req.userID})
    if(userContact){
      const userMessage=await userContact.addMessage(name,email,phone,message);
      await userContact.save();
      res.status(201).json({message:"User contact successfully"})
    }

  }catch(error){
    console.log(error)
  }
})
//Logout ka page
router.get("/logout", (req, res) => {
  console.log("Hello my logout page")
  res.clearCookie("jwtoken",{path:"/"});
  res.status(200).send("User logout");
});
/*router.get("*", (req, res) => {
  res.send("404 error page");
});*/
module.exports = router;
