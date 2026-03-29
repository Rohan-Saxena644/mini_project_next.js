import React from 'react'
import {getContactStats} from "@/actions"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const ContactStats = async () => {

    const stats = await getContactStats()

  return (
    <div className="grid gap-4 md:grid-cols-4">
      
      {/* Total */}
      <Card className="mt-4 ml-4">
        <CardHeader>
          <CardTitle>Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.total}</p>
        </CardContent>
      </Card>

      {/* New */}
      <Card className="mt-4 ml-2">
        <CardHeader>
          <CardTitle>New</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-600">
            {stats.newCount}
          </p>
        </CardContent>
      </Card>

      {/* Read */}
      <Card className="mt-4 ml-2">
        <CardHeader>
          <CardTitle>Read</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.readCount}
          </p>
        </CardContent>
      </Card>

      {/* Replied */}
      <Card className="mt-4 ml-2 mr-4">
        <CardHeader>
          <CardTitle>Replied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            {stats.repliedCount}
          </p>
        </CardContent>
      </Card>

    </div>
  )
}

export default ContactStats