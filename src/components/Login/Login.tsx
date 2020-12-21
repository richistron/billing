import React, { FormEvent, useState } from 'react'
import './login.css'
import { Input, Button } from '../Form'
import apiFetch from '../../lib/apiFetch'
import { useSelector } from 'react-redux'
import getPublicToken from '../../selectors/getPublicToken'

interface LoginResponse {
  user: {
    email: string
    id: number
    access_token: string
  }
}

type HandleSubmitOptions = {
  email: string
  password: string
  token: string
  onError: (error: string) => void
  cb: (res: LoginResponse) => void
}

const handleSubmit = ({ email, password, token, onError, cb }: HandleSubmitOptions) => (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault()
  if (email && password && token)
    apiFetch<LoginResponse>({
      url: '/login',
      method: 'POST',
      token,
      body: {
        email,
        password,
      },
      cb,
      onError,
    })
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const token = useSelector(getPublicToken)

  return (
    <div className={'login'}>
      <div className={'container'}>
        <form
          onSubmit={handleSubmit({
            email,
            password,
            token,
            cb: (res) => {
              console.log(res.user)
            },
            onError: () => {
              console.log('login failed')
            },
          })}
        >
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
            autoComplete={'current-password'}
            onChange={(value) => setPassword(value)}
          />
          <Button submit label={'Login'} />
        </form>
      </div>
    </div>
  )
}

export default Login
