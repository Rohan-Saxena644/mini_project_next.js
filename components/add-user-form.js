"use client";

import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@components/ui/card";


async function addUser(userData){
    const response = await fetch("/api/users",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    return response.json()
}


export function AddUserForm(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });


    const queryClient = useQueryClient();



    const mutation = useMutation({
        mutationFn:addUser,
        // onSuccess: (data)=>{
        //     alert("User added successfully!");
        //     setFormData({
        //         name: "",
        //         email: "",
        //         message: "",
        //     })
        // }
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["users"]}); // Invalidate the "users" query to trigger a refetch and update the UI with the new user data
            setFormData({
                name: "",
                email: "",
                message: "",
            })
        }
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        // Perform form validation here if needed
        // For example, check if all fields are filled out
        if(!formData.name || !formData.email || !formData.message) {
            alert("Please fill out all fields.");
            return;
        }

        mutation.mutate(formData)
        // Call the mutation to submit the form data
        // You can replace this with your actual mutation function
        console.log("Form submitted:", formData);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>We would love to hear from you! Please fill out the form below to get in touch with us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        type="text" 
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Input 
                        type="email" 
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Input 
                        type="text" 
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                </form>
                <Input 
                    type="text" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                    type="email" 
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Input 
                    type="text" 
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </CardFooter>
        </Card>
    )
}