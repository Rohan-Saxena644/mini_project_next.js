// 'use client'
// import React,{useState} from 'react'
// import {Button} from './ui/button'
// import {Input} from './ui/input'
// import {Textarea} from './ui/textarea'
// import { Label } from './ui/label'
// import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from './ui/card'

// const ContactForm = () => {

//     const [isSubmitting,setIsSubmitting] = useState(false);
//     const [message,setMessage] = useState("")


//     async function onSubmit(formData){
//         setIsSubmitting(true);
//         setMessage("");

//         // Main difference between server components and using fetch is that we can directly call server actions without needing to make an HTTP request. This allows for a more seamless and efficient way to handle form submissions and data processing.

//         const result = await createContact(formData);
//         if(result.success) {
//             // Optionally, you can reset the form here if needed
//             setMessage("Message sent successfully!");
//             const form = document.getElementById("contact-form");
//             form.reset();
//         }else{
//             setMessage(result.message || "An error occurred while submitting your message. Please try again later.");
//         }
//         setIsSubmitting(false);
//     }
//         // try{
//         //     const response = await fetch("/api/contact", {
//         //         method: "POST",
//         //         headers: {
//         //             "Content-Type": "application/json"
//         //         },
//         //         body: JSON.stringify(formData)
//         //     });

//         //     const data = await response.json();

//         //     if(data.success) {
//         //         setMessage(data.message);
//         //     } else {
//         //         setMessage(data.message || "An error occurred while submitting your message. Please try again later.");
//         //     }

//         // }catch(error) {
//         //     console.error("Error submitting contact form:", error);
//         //     setMessage("An error occurred while submitting your message. Please try again later.");
//         // }

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//             <CardTitle>Contact Us</CardTitle>
//             <CardDescription>We would love to hear from you! Please fill out the form below to get in touch with us.</CardDescription>
//         </CardHeader>
//         <CardContent>

//             {message && (
//                 <div className={`mb-6 p-4 rounded ${message.includes("success") ? "bg-green-500 text-green-800" : "bg-red-50 text-red-800"}`}>{message}</div>
//             )}


//             <form id="contact-form" onSubmit={onSubmit}>
//             <div className="grid w-full items-center gap-4">
//                 <div className="grid w-full items-center gap-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input id="name" placeholder="Your Name" />
//                 </div>
//                 <div className="grid w-full items-center gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input id="email" type="email" placeholder="email"/>
//                 </div>
//                 <div className="grid w-full items-center gap-2">
//                     <Label htmlFor="message">Message</Label>
//                     <Textarea id="message" placeholder="Your Message" />
//                 </div>
//             </div>
//             </form>
//         </CardContent>
//         <CardFooter>
//             <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "isSubmitting" : "Send Message"}</Button>
//         </CardFooter>
//     </Card>
//   )
// }

// export default ContactForm




'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { createContact } from '@/actions' 

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    const formData = new FormData(e.target)

    // ✅ pass a plain object — your server action destructures { name, email, message }
    const result = await createContact({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    })

    console.log(result);

    if (result.success) {
      setMessage("Message sent successfully!")
      e.target.reset()
    } else {
      setMessage(result.message || "An error occurred. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>We would love to hear from you!</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes("success") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            {message}
          </div>
        )}
        <form id="contact-form" onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="email" required />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your Message" required />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting ? "Submitting..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm