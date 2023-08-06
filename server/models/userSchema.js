const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    //unique:true,
    required: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid EmailId.");
      }
    },
  },
  phone: {
    type: Number,
    //unique:true,
    required: true,
    min: 10,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    default :Date.now
  },
  messages:[
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: Number,
        required: true,
        
      },
      message:{
        type:String,
        required:true
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//we are hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
    this.cpassword = bcrypt.hashSync(this.cpassword, 12);
  }
  next();
});
//we are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token})
    await this.save()
    return token
  } catch (err) {
    console.log(err);
  }
};
//stored the message
userSchema.methods.addMessage=async function(name,email,phone,message){
  try{
    this.messages=this.messages.concat({name,email,phone,message})
    await this.save();
    return this.messages;
  }catch(error){
    console.log(error)
  }
}
//collection creation
const User = new mongoose.model("User", userSchema);
module.exports = User;
