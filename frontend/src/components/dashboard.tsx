import React from 'react'
import Stats from "@/components/stats"

export default function dashboard({auth}:{auth:{username:string, token:string, role:string}}) {
  return (
    <div>
        <h1 className='text-3xl font-bold'>Hello {auth.username}</h1>
        <Stats/>
    
    </div>
  )
}
