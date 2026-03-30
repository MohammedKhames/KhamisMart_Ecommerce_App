"use client"

import React from 'react'

export default function errors({error} : {error: Error}) {
  return (
    <div className='my-5'>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
    </div>
  )
}
