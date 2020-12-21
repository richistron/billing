import React, { ReactNode } from 'react'

interface SessionProps {
  children: ReactNode
  login: ReactNode
}

const Session: React.FC<SessionProps> = ({ children, login }) => {
  return <>{children}</>
}

export default Session
