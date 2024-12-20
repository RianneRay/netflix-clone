import mongoose from 'mongoose';
import { env_Vars } from './envVars.js';

export const connectDB = async () => {
  
  try {
    const conn = await mongoose.connect(env_Vars.MONGO_URI)
    console.log("mongodb connected:" + conn.connection.host)
  } catch (error) {
    console.error("connection error:" + error.message)
    process.exit(1)
  }
}