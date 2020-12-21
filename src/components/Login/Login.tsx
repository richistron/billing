import React, { FormEvent, useState } from 'react'
import './login.css'
import { Input, Button } from '../Form'
import apiFetch from '../../lib/apiFetch'
import { useSelector } from 'react-redux'
import getPublicToken from '../../selectors/getPublicToken'

const handleSubmit = (email: string, password: string, token: string) => (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault()
  if (email && password && token)
    apiFetch({
      url: '/login',
      method: 'POST',
      token,
      body: {
        email,
        password,
      },
      cb: (res) => {
        console.log('res', res)
      },
      onError: (e) => {
        console.log('invalid login')
      },
    })
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const token = useSelector(getPublicToken)

  return (
    <div className={'login'}>
      <div className={'container'}>
        <form onSubmit={handleSubmit(email, password, token)}>
          <Input
            id={'email'}
            type={'email'}
            label={'Email'}
            onChange={(value) => setEmail(value)}
          />
          <Input
            id={'password'}
            type={'password'}
            label={'Password'}
            onChange={(value) => setPassword(value)}
          />
          <Button submit label={'Login'} />
        </form>
      </div>
    </div>
  )
}

export default Login
