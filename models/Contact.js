import { time } from "console";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
  },
  message: {
    type: String,
    required: true,
  },
},{timestamps: true});


const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;