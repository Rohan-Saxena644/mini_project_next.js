"use server";

import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";


export async function createContact(formData) {
    try{
        await dbConnect();
        const { name, email, message } = formData;

        if(!name || !email || !message) {
            return {
                success: false,
                message: "All fields are required."
            }
        }   

        const contact = await Contact.create({
             name: name.trim(), 
             email: email.trim().toLowerCase(), 
             message: message.trim(), 
        });

        await contact.save();

        return {
            success: true,
            message: "Your message has been submitted successfully!",
            contactId: contact._id.toString()
        }
    }catch(error) {
        console.error("Error creating contact:", error);
        return {
            success: false,
            message: "An error occurred while submitting your message. Please try again later."
        }
    }
}