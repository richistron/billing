import React from 'react'
import Login from './components/Login/Login'
import Session from './components/Session'
import './main.css'

const App = () => {
  return (
    <Session>
      {(logged) => {
        if (logged) return 'yay'

        return <Login />
      }}
    </Session>
  )
}

export default App
