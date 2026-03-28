import React from 'react'
import {getContacts , updateContact} from '@/actions'
import {Badge} from './ui/badge'
import { Mail } from 'lucide-react';
import {Card,CardContent,CardHeader} from '@/components/ui/card';
import { Button } from '@base-ui/react';


const ContactLists = async () => {

    const contacts = await getContacts();

    // console.log(contacts); checks and tells each user till now written in the message documnet in mongo cluster

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <Badge variant="secondary">{contacts.length} messages</Badge>
        </div>

        {contacts.length === 0 ?(
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4">
                {
                    contacts.map((contact)=>(
                        <Card key={contact._id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{contact.name}</h3>
                                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                                        {console.log(contact.status)}
                                    </div>
                                    <Badge variant="outline">
                                        {/* {new Date(contact.createdAt).toLocaleDateString()} */}
                                        {contact.status}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div>
                                    {contact.message}
                                </div>
                            </CardContent>

                            <div className="flex gap-2 ml-4">
                                {contact.status === "new"  && (
                                    <form action={async ()=>{
                                        "use server"
                                        await updateContact(contact._id,"read")
                                    }}
                                    >
                                        <Button variant="outline" size="sm" type="submit" className="border rounded p-2 border-blue-500 hover:bg-blue-700">Mark As Read</Button>
                                    </form>
                                )}

                                {contact.status === "read"  && (
                                    <form action={async ()=>{
                                        "use server"
                                        await updateContact(contact._id,"replied")
                                    }}
                                    >
                                        <Button variant="outline" size="sm" type="submit" className="border rounded p-2 border-blue-500 hover:bg-blue-700">Mark As Replied</Button>
                                    </form>
                                )}
                            </div>
                        </Card>
                    ))
                }
            </div>
        ) }
    </div>

  )
}

export default ContactLists