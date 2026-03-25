'use client'
import React,{useState} from 'react'
import {Button} from './ui/button'
import {Input} from './ui/input'
import {Textarea} from './ui/textarea'
import { Label } from './ui/label'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from './ui/card'

const ContactForm = () => {

    const [isSubmitting,setIsSubmitting] = useState(false);
    const [message,setMessage] = useState("")


    async function onSubmit(formData){
        
    }

  return (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>We would love to hear from you! Please fill out the form below to get in touch with us.</CardDescription>
        </CardHeader>
        <CardContent>
            <form id="contact-form" onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                </div>
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email"/>
                </div>
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your Message" />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "isSubmitting" : "Send Message"}</Button>
        </CardFooter>
    </Card>
  )
}

export default ContactForm