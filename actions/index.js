"use server";

import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";


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
             status: "new",
        });

        //await contact.save();

        revalidateTag("contact-stats")

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


export async function getContacts(){
    try{
        await dbConnect();
        const contacts = await Contact.find({}).sort({createdAt:-1}).lean()
        return contacts.map((contact)=>({
            ...contact,
            _id: contact._id.toString(),
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        }))

    }catch(error){
        console.error("Error fetching contacts",error);
        return [];
    }
}


export async function updateContact(contactId,status){
    try{
        await dbConnect();
        await Contact.findByIdAndUpdate(contactId,{status});
        // revalidatePath("/contacts")
        revalidateTag("contact-stats")
        return {success:true}

    }catch(error){
        console.error("Error updating contact status:",error)
        return {success: false , error: "Failed to update Status"}
    }
}


export async function getContactStats(){
    const getCachedStats = unstable_cache(
        async()=>{
            await dbConnect();
            const total = await Contact.countDocuments()
            const newCount = await Contact.countDocuments({status: "new"})
            const readCount = await Contact.countDocuments({status: "read"})
            const repliedCount = await Contact.countDocuments({status: "replied"})

            return {total,newCount,readCount,repliedCount}
        },
        ["contact-stats"],
        {tags:["contact-stats"]}

    )

    return getCachedStats()
}