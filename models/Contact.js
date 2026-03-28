
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "new",
  }
},{timestamps: true});


const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;