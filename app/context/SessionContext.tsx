"use client"

import React from 'react'
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

interface Props{
    children: React.ReactNode
}

const SessionContext = ({ children}: Props ) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionContext


