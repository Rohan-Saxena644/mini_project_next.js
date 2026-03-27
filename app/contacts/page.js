import { Button } from '@base-ui/react'
import  Link  from 'next/link'
import ContactLists from '@/components/contact-list'
import React from 'react'

const Contact = () => {
  return (
    <main className='min-h-screen container mx-auto'>
        <h1 className='text-4xl font-bold mt-10 p-5'>Contact Page</h1>
        <div className='mb-8 text-lg text-gray-600 mt-5 container mx-auto'>
          <div className='mb-4 text-4xl p-4 mb-4'>
            Feel free to reach out to us with any questions or inquiries you may have!!
          </div>
          
      
          <div className='mb-4 text-bold'>
            <Link  href="/" className='inline-flex items-center justify-center px-4 py-2 border-2 border-blue-500 rounded hover:border-blue-700 text-sm font-medium ml-10 mb-6'>
              Back to form
           </Link>
          </div>

          <div className="items-center justify-center mt-12 mx-auto ml-8 text-bold">
            <ContactLists/>
          </div>
        

        </div>
    </main>
  )
}

export default Contact