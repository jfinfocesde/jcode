"use client"

import { recoverSession } from '@/app/utilities/recoverSession'
import React from 'react'

function page() {
  recoverSession()
  return (
    <div>Profile</div>
  )
}

export default page