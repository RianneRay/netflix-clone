import jwt from 'jsonwebtoken';
import { env_Vars } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, env_Vars.JWT_SECRET, {expiresIn: '15d'});
  
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: env_Vars.NODE_ENV !== "development"
  })
  return token;
}