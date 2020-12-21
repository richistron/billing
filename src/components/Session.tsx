import React, { ReactNode } from 'react'

interface SessionProps {
  children: (validSession: boolean) => ReactNode
}

const Session: React.FC<SessionProps> = ({ children }) => {
  const isSessionValid = false
  return <>{children(isSessionValid)}</>
}

export default Session
