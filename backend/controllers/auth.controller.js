import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const { username, password, email } = req.body
  
  try {
    
    if (!username || !password || !email) {
      return res.status(400).json({success: false, message:'all field required'});
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(!emailRegex.test(email)) {
      return res.status(400).json({success: false, message: "invalid email"});
    }
    
    if(password.length < 8) {
      return res.status(400).json({success: false, message: "password must atleast 8 characters"});
    }
    
    const existingUserByEmail = await User.findOne({email:email})
    
    if(existingUserByEmail){
      return res.status(400).json({success: false, message: "email is already in use"});
    }
    
    const existingUserByUsername = await User.findOne({username:username});
  
  if(existingUserByUsername) {
    return res.status(400).json({success:false, message: "username is already in use"})
  }
  
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)
  
  const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
  
  const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.lenght)];
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    image,
  });
  
  generateTokenAndSetCookie(newUser._id, res);
  await newUser.save();
  res.status(200).json({success: true, user: {
    ...newUser._doc,
    password: ""
  }});
    
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json({success: false, message: "all field required"})
    }
    
    const user = await User.findOne({email:email})
    
    if(!user) {
      res.status(404).json({success:false, message: "invalid credentials"})
    }
    
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    
    if(!isPasswordCorrect) {
      res.status(404).json({success: false, message: "invalid credentials"})
    }
    
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({success: true, user: {
      ...user._doc,
      password: ""
    }});
    
  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({success: false, message: "internal server error"})
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({success: true, message: "logout successfully"})
  } catch (error) {
    console.log("error in logout controller", error.message)
    return res.status(500).json({success: false, message: "internal server error"});
  }
}

