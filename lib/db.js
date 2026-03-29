import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let isConnected = false;

async function dbConnect (){
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  } else {
    try {
      const db = await mongoose.connect(MONGODB_URL)

      isConnected = db.connections[0].readyState === 1;

      console.log("Connected to the database successfully.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
};    

export default dbConnect;