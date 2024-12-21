import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { env_Vars } from '../config/envVars.js'


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    
    if(!token) {
      return res.status(401).json({success: false, message: "unauthorized no token provided"});
    }
    
    const decoded = jwt.verify(token, env_Vars.JWT_SECRET);
    
    if(!decoded) {
      return res.status(401).json({success: false, message: "unauthorized invalid token"});
    }
    
    const user = await User.findById(decoded.userId).select("-password");
    
    if(!user) {
      return res.status(404).json({success:false, message: "user not found"});
    }
    
    req.user = user;
    
    next();
  } catch (error) {
    console.log("problem with protectRouter Middleware", error.message)
    res.status(500).json({succes: false, message: "internal server error"})
  }
}