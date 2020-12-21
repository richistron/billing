import React from 'react'
import './login.css'
import { Input, Button } from '../Form'

const Login = () => {
  return (
    <div className={'login'}>
      <div className={'container'}>
        <form>
          <Input
            id={'email'}
            type={'email'}
            label={'Email'}
            onChange={(value) => console.log('email', value)}
          />
          <Input
            id={'password'}
            type={'password'}
            label={'Password'}
            onChange={(value) => console.log('password', value)}
          />
          <Button submit label={'Login'} />
        </form>
      </div>
    </div>
  )
}

export default Login
