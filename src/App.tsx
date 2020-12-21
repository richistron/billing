import React from 'react'
import Login from './components/Login/Login'
import Session from './components/Session'
import './main.css'

const App = () => {
  return (
    <Session>
      {({ isLoading, isSessionValid }) => {
        if (isLoading) return 'loading...'
        if (isSessionValid) return 'yay'
        return <Login />
      }}
    </Session>
  )
}

export default App
